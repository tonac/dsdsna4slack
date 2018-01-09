import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResultService } from '../../services/result.service';
import { AnalysisResult } from '../../model/analysisResult';
import { GraphParser } from '../../utils/graphParser';
import { Network } from 'vis';
import { UIConstants } from '../../utils/UIConstants';


@Component({
  selector: 'app-publicShare',
  templateUrl: './publicShare.component.html',
  styleUrls: ['./publicShare.component.css']
})
export class PublicShareComponent implements OnInit {

  public selectedResult;
  public UIConstants: UIConstants = new UIConstants();
  public hasResults: boolean = false;
  constructor(private route: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {
    let graphParser: GraphParser = new GraphParser();
    this.route.params
      .map(param => param['id'])
      .flatMap(param => {
        return this.resultService.getPublicResultForKey(param);
      })
      .subscribe({
        next: result => {
          console.log(result);
          this.selectedResult = result;
          result.graph = graphParser.parse(result);
          this.hasResults = true;
          console.log(result);
          this.displayGraph(result);
        }, 
        error: err => {
          console.log(err);
        }
      })
  }

  displayGraph(result: AnalysisResult) {
    this.selectedResult = result;
    this.selectedResult.density = (result.density).toFixed(2);
    this.selectedResult.path_length = (result.path_length).toFixed(2);
    this.selectedResult.average_clustering = (result.average_clustering).toFixed(2);
    setTimeout(() => {
      let container = document.getElementById('my_network');
      let options = result.graph_type == 'mention' ? this.resultService.getOptionsForMentionBasedGraph() : this.resultService.getOptionsForSubscriptionBasedGraph();
      let network = new Network(container, result.graph, options);
    }, 50);
  }

}
