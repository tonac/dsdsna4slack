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
  selectedGraphType: number;
  selectedArchive: number;

  channelsForArchive: { [archiveId: number] : Channel[]; } = {};

  channelsSubject: BehaviorSubject<Array<Channel>>;
  selectedArchiveSubject: BehaviorSubject<number>;

  constructor(private archiveService: ArchiveService, private alertService: AlertService) { }

  ngOnInit() {
    this.channelsForArchive[-1] = new Array<Channel>();
    this.selectedGraphType = 0;

    this.channelsSubject = new BehaviorSubject<Array<Channel>>([]);
    this.selectedArchiveSubject = new BehaviorSubject<number>(null);


    this.archiveService.getAllForUser()
      .subscribe({
        next:
          o => {
            this.archives = o;
            for (var archive of o) {
              var tmpChannels = [new Channel(-1, 'all')];
              tmpChannels = tmpChannels.concat(archive.channels);
              this.channelsForArchive[archive.id] = tmpChannels;
            }
          },
        error: error => {
          this.alertService.error('Error while fetching archives: ' + error);
        }
      });

    
    this.selectedArchiveSubject
      .subscribe({
        next: archiveId => {
          this.channelsSubject.next(this.channelsForArchive[archiveId]); 
          console.log("archive selected" + archiveId); 
        },
        error: error => {
          this.alertService.error('Error when selecting archive: ' + error);
        }
      });

    this.channelsSubject
      .subscribe({next: incomingChannels => {
        if(incomingChannels != null){
        this.channels = [];
        for(let chan of incomingChannels){
          this.channels.push({checked: false, channel: chan});
        }}
      }});
  }

  selectArchive(archiveID: number){
    this.selectedArchive = archiveID;
    this.selectedArchiveSubject.next(archiveID);
  }

  selectGraphType(graphType: number){
    console.log("Graphtype selected " + graphType);
    console.log(this.selectedGraphType);
  }

  checkboxSelected(aCheckbox: number){
    let allSelected = (document.getElementById('-1') as HTMLInputElement).checked;
    if (aCheckbox === -1){
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
