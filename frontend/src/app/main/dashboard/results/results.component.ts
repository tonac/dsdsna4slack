import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ResultService} from '../../../services/result.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Network} from 'vis';
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

  public results;
  resultsArray: Array<AnalysisResult> = [];
  public graphVisualization = false;
  flag: string;
  public selectedResult;

  public mentionExplanation = "This explains mention based graph.";
  public subscriptionExplanation = "This explains subscription based graph.";

  public UIConstants: UIConstants = new UIConstants();

  public filters: FilterModel;
  public form: FormGroup; 


  constructor(private data: Data, private resultService: ResultService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    var graphParser: GraphParser = new GraphParser();
    this.filters = new FilterModel();
    this.resultService.getResultsForUser()
    .subscribe({
      next: results => {
        this.resultsArray = results;
        this.results = [];
        var id = this.data.storage ? this.data.storage.resultsId : undefined;
        var graphToDisplay = undefined;
        for(var result of results) {
          let graph = graphParser.parse(result);
          if(id == result.id) {
            graphToDisplay = result;
          }
          result.json_graph = undefined;
          result.graph = graph;
        }
        if(graphToDisplay) {
          this.enlarge(graphToDisplay);
        }
      }
    });

    this.form = new FormGroup({
      'minNodeClustering': new FormControl(),
      'maxNodeClustering': new FormControl(),
      'minInDegree': new FormControl(),
      'maxInDegree': new FormControl()
    });

    // this.setupForm();

    document.getElementById('sidebar-results').setAttribute('onclick', 'window.location.reload(false); ');
  }

  formChanged() {
    console.log(this.filters);
  }

  // setupForm() {
  //   this.form
  //   .valueChanges
  //   .debounceTime(1000)
  //   .subscribe(s => {
  //     if(s['minNodeClustering']) {
  //       this.filters.minimumNodeClustering = Number(s['minNodeClustering']);
  //     }
  //     if(s['maxNodeClustering']) {
  //       this.filters.maximumNodeClustering = Number(s['maxNodeClustering']);
  //     }

  //     if(s['minInDegree']) {
  //       this.filters.minimumInDegree = Number(s['minInDegree']);
  //     }
  //     if(s['maxInDegree']) {
  //       this.filters.maximumInDegree = Number(s['maxInDegree']);
  //     }
  //     console.log(this.filters);
  //   });
  // }

  public getResultId(index) {
    return 'network' + index;
  }

  public enlarge(result) {
    this.graphVisualization = true;

    this.selectedResult = result;
    this.selectedResult.density = (result.density).toFixed(2);
    this.selectedResult.path_length = (result.path_length).toFixed(2);
    this.selectedResult.average_clustering = (result.average_clustering).toFixed(2);
    
    setTimeout(() => {
      let container = document.getElementById('my_network');
      let network = new Network(container, result.graph, this.resultService.getOptions());
    }, 50);
  }

  public goBackToResults() {
    this.graphVisualization = false;
  }
}
