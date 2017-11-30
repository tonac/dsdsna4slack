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
      '/api/archives/',
      this.userService.jwt()
    ).map((response: Response) => {
      let archives = response.json() as Archive[];
      return archives;
    });
  }

  addNew(form, filename): Observable<Archive> {
    return this.http.post('/api/upload/',
      {file: form.file.value},
      this.userService.jwt(filename)).map((response: Response) => {
      let archive = response.json() as Archive;
      return archive;
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
