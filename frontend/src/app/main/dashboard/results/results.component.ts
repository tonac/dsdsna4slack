import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Network } from 'vis';
import { Observable } from 'rxjs/Observable';
import { GraphParser } from '../../../utils/graphParser';
import { Data } from '../../../model/data';
import { AnalysisResult } from '../../../model/analysisResult';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultsArray: Array<AnalysisResult> = [];
  public graphVisualization = false;
  public selectedResult;

  constructor(private data: Data, private resultService: ResultService, private route: ActivatedRoute) {
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
            if (id == result.id) {
              graphToDisplay = result;
            }
            result.json_graph = undefined;
            result.graph = graph;
          }
          if (graphToDisplay) {
            this.enlarge(graphToDisplay);
          }
        }
      });

    document.getElementById('sidebar-results').setAttribute('onclick', 'window.location.reload(false); ')

  }

  public getResultId(index) {
    return 'network' + index;
  }

  public enlarge(result) {
    this.graphVisualization = true;
    this.selectedResult = result;

    setTimeout(() => {
      let container = document.getElementById('my_network');
      let options = result.graph_type == 'mention' ? this.resultService.getOptionsForMentionBasedGraph() : this.resultService.getOptionsForSubscriptionBasedGraph();
      let network = new Network(container, result.graph, options);
    }, 50);
  }

  public goBackToResults() {
    this.graphVisualization = false;
  }
}
