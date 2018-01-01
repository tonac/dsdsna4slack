import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Archive} from '../model/archive';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';

@Injectable()
export class ArchiveService {

  constructor(private http: Http, private userService: UserService) {
  }

  getAllForUser(): Observable<Array<Archive>> {
    return this.http.get(
      '/api/archive/v1/archive/',
      this.userService.jwt()
    ).map((response: Response) => {
      let archives = response.json() as Archive[];
      return archives;
    });
  }

  addNew(file): Observable<Archive> {
    const formData = new FormData();
    formData.append('datafile', file);
    return this.http.post('/api/archive/v1/archive/',
      formData,
      this.userService.jwt()).map((response: Response) => {
      let archive = response.json() as Archive;
      return archive;
    });

    // return this.http.request(new Request(new BaseRequestOptions().merge({
    //   method: 'post',
    //   url: '/api/archives/',
    //   body: file,
    //   headers: this.userService.jwt().headers
    // })))
    //   .map((response: Response) => {
    //     return new Archive();
    //   })
  }

  delete(id): Observable<Boolean> {
    let url: string = '/api/archive/v1/archive/' + id 
    return this.http.delete(url, this.userService.jwt()).map((response: Response) => {
      return response.json() == undefined;
    })
  }

}
