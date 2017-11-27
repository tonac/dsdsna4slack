import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Archive} from "../model/archive";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ArchiveService {

  constructor(private http: Http) {
  }

  getAllForUser(): Observable<Array<Archive>> {
    return this.http.get(
      '/api/archives/',
      {headers: new Headers({'content-type': 'application/json'})}
    ).map((response: Response) => {
      return response.json();
    }).map( (data : Array<Archive>) => {
      return [new Archive()]
    });
  }

}
