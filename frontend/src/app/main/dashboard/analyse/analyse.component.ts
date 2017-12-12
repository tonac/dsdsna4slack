import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Archive } from '../../../model/archive';
import { Channel } from '../../../model/channel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ArchiveService } from '../../../services/archive.service';
import { AlertService } from '../../../services/alert.service';
import { AnalysisRequest } from '../../../model/analysisRequest';
import { ResultService } from '../../../services/result.service';
import { Data } from '../../../model/data';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  requestData: AnalysisRequest;


  loading: boolean;

  archives: Array<Archive>;
  channels: Array<any>;

  selectedGraphType: number;
  selectedArchive: number;

  channelsForArchive: { [archiveId: number] : Channel[]; } = {};

  channelsSubject: BehaviorSubject<Array<Channel>>;
  selectedArchiveSubject: BehaviorSubject<number>;

  graphTypes: Array<any> = [{id:"mention", name:'mention based'}, {id:"subscription", name:'subscription based'}];

  constructor(private data: Data, private resultService: ResultService, private archiveService: ArchiveService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.requestData = new AnalysisRequest();
    this.requestData.graph_type = "mention";

    this.channelsForArchive[-1] = new Array<Channel>();
    this.selectedGraphType = 0;
    this.channelsSubject = new BehaviorSubject<Array<Channel>>([]);
    this.selectedArchiveSubject = new BehaviorSubject<number>(null);

    this.archives = new Array<Archive>();

    this.archiveService.getAllForUser()
      .flatMap((archive, index) => archive)
      .subscribe({
        next:
          archive => {
            this.archives.push(archive);
            this.channelsForArchive[archive.id] = 
              [new Channel(-1, 'ALL')].concat(archive.channels);
          },
        error: error => {
          this.alertService.error('Error while fetching archives: ' + error);
        }
      });

    
    this.selectedArchiveSubject
      .subscribe({
        next: archiveId => {
          this.requestData.archive = archiveId;
          this.channels = [];
          if(this.channelsForArchive[archiveId]) {
            this.channelsSubject.next(this.channelsForArchive[archiveId]); 
            console.log("archive selected" + archiveId);
          }
        },
        error: error => {
          this.alertService.error('Error when selecting archive: ' + error);
        }
      });

    this.channelsSubject
      .flatMap((channel, index) => channel )
      .subscribe({
        next: channel => {
          this.channels.push({checked: false, channel: channel});
        }
      });
  }

  selectArchive(archiveID: number){
    this.selectedArchiveSubject.next(archiveID);
  }

  // selectGraphType(graphType: number){
  //   console.log("Graphtype selected " + graphType);
  //   console.log(this.selectedGraphType);
  // }

  checkboxSelected(aCheckbox: number){
    let allSelected = (document.getElementById('-1') as HTMLInputElement).checked;
    let thisSelected: boolean = (document.getElementById(aCheckbox.toString()) as HTMLInputElement).checked;


    if (aCheckbox === -1){
      this.requestData.channels = [];
      for(var channel of this.channels){
        (document.getElementById(channel.channel.id) as HTMLInputElement).checked = allSelected;
        channel.checked = allSelected;
      }
    }

    this.requestData.channels = [];
    for(var channel of this.channels) {
      if((document.getElementById(channel.channel.id) as HTMLInputElement).checked) {
        this.addChannelToRequestData(channel.channel.name);
      }
    }
  }

  addChannelToRequestData(channelName: string) {
    if("all" != channelName.toLowerCase()) {
      this.requestData.channels.push(channelName);
    }
  }

  analyse() {

    

    if(this.requestData.valid()) {
      this.resultService.getResultForRequest(this.requestData)
      .subscribe({
        next: result => {
          this.data.storage = {
            "resultsId": result.id
          }
          console.log(result);
          this.router.navigate(['/dashboard/results']);
        },
          error: error => this.alertService.error('There was an error processing this request.')
      })
    } else {
      this.alertService.error('Not all fields are valid.');
    }
  }
}
