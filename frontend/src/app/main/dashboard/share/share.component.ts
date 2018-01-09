import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Network } from 'vis';
import { Observable } from 'rxjs/Observable';
import { GraphParser } from '../../../utils/graphParser';
import { Data } from '../../../model/data';
import { AnalysisResult } from '../../../model/analysisResult';
import { ShareService } from '../../../services/share.service'
import { UIConstants } from '../../../utils/UIConstants';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})

export class ShareComponent implements OnInit {

  resultsArray: Array<AnalysisResult> = [];

  constructor(private data: Data, private resultService: ResultService, private shareService: ShareService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    var graphParser: GraphParser = new GraphParser();
    this.resultService.getResultsForUser()
      .subscribe({
        next: results => {
          this.resultsArray = results;
          var id = this.data.storage ? this.data.storage.resultsId : undefined;
          var graphToDisplay = undefined;
          for (var result of results) {
            let graph = graphParser.parse(result);
            result.json_graph = undefined;
            result.graph = graph;
          }
        }
      });
  }

  public getResultId(index) {
    return 'network' + index;
  }

  toogleShare(result: AnalysisResult, id: string) {
    this.shareService.setShare(id)
    .catch((err: any, caught: Observable<boolean>) => {
      return Observable.of(false);
    })
    .subscribe({
      next: requestResult => {
        if(requestResult) {
          result.public = !result.public;
        }
      }
    })
  }

  shareLinkFor(id: string) {
    return window.location.href.substring(0, -1) + 'shared/' + id.replace(/-/gi, '');
  }
}
