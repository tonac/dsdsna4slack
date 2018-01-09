import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { DataSet, Edge, IdType, Node } from 'vis';
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

  getResultsForId(id: number): Observable<AnalysisResult> {
    return this.http.get(
      '/api/analysis/v1/overall-metrics/' + id,
      this.userService.jwt()
    ).map((response: Response) => {
      return response.json() as AnalysisResult;
    });
  }

  getPublicResultForKey(key: string) : Observable<AnalysisResult> {
    return this.http.get(
      '/api/analysis/v1/share/' + key
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

  getOptionsForMentionBasedGraph() {
    return {
      layout: {
        improvedLayout: true
      },
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
          gravitationalConstant: -50,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
          avoidOverlap: 0.5
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 150 }
      },
      interaction: {
        tooltipDelay: 100
      }
    };
  }

  getOptionsForSubscriptionBasedGraph() {
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
      physics: false,
      interaction: {
        tooltipDelay: 100
      }
    };
  }
}
