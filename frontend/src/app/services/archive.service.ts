import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Archive} from '../model/archive';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';

@Injectable()
export class ArchiveService {

  constructor(private http: Http, private userService: UserService) {
  }

  getAllForUser(): Observable<Array<Archive>> {
    return this.http.get(
      '/api/archives/',
      this.userService.jwt()
    ).map((response: Response) => {
      return response.json();
    }).map((data: Array<Archive>) => {
      return [new Archive()]
    });
  }

  addNew(form, filename): Observable<Archive> {
    let headers = new Headers({'Authorization': 'Token '});
    return this.http.post('/api/archives/',
      {file: form.file.value},
      this.userService.jwt(filename)).map((response: Response) => {
      return new Archive();
    });

    // return this.http.request(new Request(new BaseRequestOptions().merge({
    //   method: 'post',
    //   url: '/api/archives/',
    //   body: formData,
    //   headers: this.userService.jwt().headers
    // })))
    //   .map((response: Response) => {
    //     return new Archive();
    //   })
  }

}
