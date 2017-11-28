import {Component, OnInit} from '@angular/core';
import {ResultService} from '../../../services/result.service';
import {Network} from 'vis';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public results;
  public graphVisualization = false;

  constructor(private resultService: ResultService) {
  }

  public ngOnInit(): void {
    this.results = this.resultService.getResults();
  }

  public getResultId(index) {
    return 'network' + index;
  }

  public enlarge(result) {
    this.graphVisualization = true;
    setTimeout(() => {
      let container = document.getElementById('my_network');
      let network = new Network(container, result, this.resultService.getOptions());
    }, 50);
  }

  public goBackToResults() {
    this.graphVisualization = false;
  }
}
