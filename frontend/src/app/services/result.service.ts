import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {DataSet, Edge, IdType, Node} from 'vis';
import { AnalysisRequest } from '../model/analysisRequest';
import { AnalysisResult } from '../model/analysisResult';

@Injectable()
export class ResultService {

  constructor(private http: Http, private userService: UserService) {
  }

  getResultForRequest(request: AnalysisRequest): Observable<AnalysisResult> {
    return this.http.post(
      '/api/analysis/v1/overall-metrics/',
      request,
      this.userService.jwt()
    ).map((response: Response) => {
      return response.json() as AnalysisResult;
    });
  }

  getResultsForId(id: number): Observable<any> {
    return this.http.get(
      '/api/analysis/v1/overall-metrics/' + id,
      this.userService.jwt()
    ).map((response: Response) => {
      return response.json() as AnalysisResult;
    });
  }

  getResultsForUser(): Observable<Array<AnalysisResult>> {
    return this.http.get(
      '/api/analysis/v1/overall-metrics/',
      this.userService.jwt()
    ).map((response: Response) => {
      return response.json() as AnalysisResult[];
    });
  }

  getResults() {
    return [this.getGraph2(), this.getGraph1()];
  }

  private getGraph1() {
    let nodes: Node;
    let edges: Edge;

    nodes = new DataSet([
      {id: 1, value: 2, label: 'Algie'},
      {id: 2, value: 31, label: 'Alston'},
      {id: 3, value: 12, label: 'Barney'},
      {id: 4, value: 16, label: 'Coley'},
      {id: 5, value: 17, label: 'Grant'},
      {id: 6, value: 15, label: 'Langdon'},
      {id: 7, value: 6, label: 'Lee'},
      {id: 8, value: 5, label: 'Merlin'},
      {id: 9, value: 30, label: 'Mick'},
      {id: 10, value: 18, label: 'Tod'},
    ]);
    // create an array with edges
    edges = new DataSet([
      {from: 2, to: 8, value: 3, title: '3 emails per week'},
      {from: 2, to: 9, value: 5, title: '5 emails per week'},
      {from: 2, to: 10, value: 1, title: '1 emails per week'},
      {from: 4, to: 6, value: 8, title: '8 emails per week'},
      {from: 5, to: 7, value: 2, title: '2 emails per week'},
      {from: 4, to: 5, value: 1, title: '1 emails per week'},
      {from: 9, to: 10, value: 2, title: '2 emails per week'},
      {from: 2, to: 3, value: 6, title: '6 emails per week'},
      {from: 3, to: 9, value: 4, title: '4 emails per week'},
      {from: 5, to: 3, value: 1, title: '1 emails per week'},
      {from: 2, to: 7, value: 4, title: '4 emails per week'}
    ]);

    // create a network
    return {
      nodes: nodes,
      edges: edges
    };
  }

  private getGraph2() {
    let nodes: Node;
    let edges: Edge;

    nodes = new DataSet([
      {id: 1, value: 2, label: 'Jasna'},
      {id: 2, value: 2, label: 'Marin'},
      {id: 3, value: 2, label: 'Sandi'},
      {id: 4, value: 2, label: 'Jesus'},
      {id: 5, value: 2, label: 'Ivan'},
      {id: 6, value: 2, label: 'Antonio'}
    ]);
    // create an array with edges
    edges = new DataSet([
      {from: 1, to: 2, value: 3},
      // {from: 1, to: 3, value: 5},
      {from: 1, to: 4, value: 1},
      // {from: 1, to: 5, value: 8},
      // {from: 1, to: 6, value: 2},
      {from: 2, to: 3, value: 1},
      {from: 2, to: 4, value: 2},
      // {from: 2, to: 5, value: 6},
      {from: 2, to: 6, value: 2},
      {from: 3, to: 4, value: 1},
      {from: 3, to: 5, value: 4},
      // {from: 3, to: 6, value: 2},
      {from: 4, to: 5, value: 1},
      {from: 4, to: 6, value: 4},
      {from: 5, to: 6, value: 3}
    ]);

    // create a network
    return {
      nodes: nodes,
      edges: edges
    };
  }

  getOptions() {
    return {
      autoResize: true,
      nodes: {
        shape: 'dot',
        scaling: {
          label: {
            min: 8,
            max: 20
          }
        }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: {iterations: 150}
      },
      interaction: {
        tooltipDelay: 100
      }
    };
  }
}
