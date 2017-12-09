import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Archive } from '../../../model/archive';
import { Channel } from '../../../model/channel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ArchiveService } from '../../../services/archive.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  loading: boolean;
  archives: Array<Archive>;
  graphTypes: Array<any> = [{id:0, name:'mention based'}, {id:1, name:'subscription based'}];
  channels: Array<any>;
  selectedArchive: number;
  selectedGraphType: number;

  channelsSubject: BehaviorSubject<Array<Channel>>;
  selectedArchiveSubject: BehaviorSubject<number>;

  constructor(private archiveService: ArchiveService, private alertService: AlertService) { }

  ngOnInit() {
    this.selectedArchive = -1;
    this.selectedGraphType = 0;

    this.channelsSubject = new BehaviorSubject<Array<Channel>>([]);
    this.selectedArchiveSubject = new BehaviorSubject<number>(null);


    this.archiveService.getAllForUser()
      .subscribe({
        next:
          o => {
            this.archives = o;
          },
        error: error => {
          this.alertService.error('Error while fetching archives: ' + error);
        }
      });

    
    this.selectedArchiveSubject
      .subscribe({
        next: archiveId => {
          this.addChannels(archiveId);        
        },
        error: error => {
          this.alertService.error('Error when selecting archive: ' + error);
        }
      });

    this.channelsSubject
      .subscribe({next: incomingChannels => {
        this.channels = [];
        for(let chan of incomingChannels){
          this.channels.push({checked: false, channel: chan});
          console.log(chan.id);
        }
      }});
  }

  addChannels(forArchiveId: number) {
    if (forArchiveId != null) {
    this.channelsSubject.next([
      new Channel(0, 'all'),
      new Channel(1, '#general'),
      new Channel(2, '#random')
    ]);
  }
  }

  removeChannels() {
    this.channelsSubject.next([]);
  }

  selectArchive(archiveID: number){
    this.selectedArchiveSubject.next(archiveID);
  }

  selectGraphType(graphType: number){
  }

  checkboxSelected(aCheckbox: number){
    let allSelected = (document.getElementById('0') as HTMLInputElement).checked;
    if (aCheckbox === 0){
      for(var channel of this.channels){
        (document.getElementById(channel.channel.id) as HTMLInputElement).checked = allSelected;
        channel.checked = allSelected;
      }
    }
  }

  analyse() {
    console.log('I\'m analisyng');
  }
}
