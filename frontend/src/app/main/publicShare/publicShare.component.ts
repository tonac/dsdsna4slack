import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ResultService } from '../../services/result.service';
import { AnalysisResult } from '../../model/analysisResult';
import { GraphParser } from '../../utils/graphParser';

@Component({
  selector: 'app-publicShare',
  templateUrl: './publicShare.component.html',
  styleUrls: ['./publicShare.component.css']
})
export class PublicShareComponent implements OnInit {

  public selectectedResult;

  constructor(private route: ActivatedRoute, private resultService: ResultService) { }

  ngOnInit() {
    let graphParser: GraphParser = new GraphParser();
    this.route.params
      .map(param => param['id'])
      .flatMap(param => {
        return this.resultService.getResultsForId(param);
      })
      .subscribe({
        next: result => {
          this.selectectedResult = result;
          let graph = graphParser.parse(result);
        }
      })
  }

  displayGraph(result: AnalysisResult) {
    
  }

}
