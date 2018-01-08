import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Network } from 'vis';
import { Observable } from 'rxjs/Observable';
import { GraphParser } from '../../../utils/graphParser';
import { Data } from '../../../model/data';
import { AnalysisResult } from '../../../model/analysisResult';
import { UIConstants } from '../../../utils/UIConstants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FilterModel } from '../../../model/filterModel'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultsArray: Array<AnalysisResult> = [];
  public graphVisualization = false;
  public selectedResult;

  public mentionExplanation = "This explains mention based graph.";
  public subscriptionExplanation = "This explains subscription based graph.";

  public UIConstants: UIConstants = new UIConstants();

  public filters: FilterModel;

  constructor(private data: Data, private resultService: ResultService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    var graphParser: GraphParser = new GraphParser();
    this.filters = new FilterModel();

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
    document.getElementById('sidebar-results').setAttribute('onclick', 'window.location.reload(false); ');
  }

  formChanged() {
    let minimumNodeClustering: number = Number(this.filters.minimumNodeClustering) ? Number(this.filters.minimumNodeClustering) : 0.0;
    let maximumNodeClustering: number = Number(this.filters.maximumNodeClustering) ? Number(this.filters.maximumNodeClustering) : 1.0;

    let minimumInDegree: number = Number(this.filters.minimumInDegree) ? Number(this.filters.minimumInDegree) : 0.0;
    let maximumInDegree: number = Number(this.filters.maximumInDegree) ? Number(this.filters.maximumInDegree) : Number.MAX_VALUE;

    let minimumOutDegree: number = Number(this.filters.minimumOutDegree) ? Number(this.filters.minimumOutDegree) : 0;
    let maximumOutDegree: number = Number(this.filters.maximumOutDegree) ? Number(this.filters.maximumOutDegree) : Number.MAX_VALUE;
    
    console.log(minimumNodeClustering + " " +
      maximumNodeClustering + " " +
      minimumInDegree + " " +
      maximumInDegree + " " +
      minimumOutDegree + " " +
      maximumOutDegree);

    let graphParser = new GraphParser();
    var result = this.copyObject(this.selectedResult);
    result.graph = graphParser.prune(result.graph,
      minimumNodeClustering,
      maximumNodeClustering,
      minimumInDegree,
      maximumInDegree,
      minimumOutDegree,
      maximumOutDegree);


    this.displayGraph(result);
  }

  public getResultId(index) {
    return 'network' + index;
  }

  public enlarge(result) {
    this.graphVisualization = true;

    this.selectedResult = result;
    this.selectedResult.density = (result.density).toFixed(2);
    this.selectedResult.path_length = (result.path_length).toFixed(2);
    this.selectedResult.average_clustering = (result.average_clustering).toFixed(2);

    this.displayGraph(result);
  }

  displayGraph(result) {
    setTimeout(() => {
      let container = document.getElementById('my_network');
      let options = result.graph_type == 'mention' ? this.resultService.getOptionsForMentionBasedGraph() : this.resultService.getOptionsForSubscriptionBasedGraph();
      let network = new Network(container, result.graph, options);
    }, 50);
  }

  public goBackToResults() {
    this.graphVisualization = false;
    this.filters = new FilterModel()
  }

  copyObject<T> (object:T): T {
    var objectCopy = <T>{};

    for (var key in object)
    {
        if (object.hasOwnProperty(key))
        {
            objectCopy[key] = object[key];
        }
    }

    return objectCopy;
  }
}
