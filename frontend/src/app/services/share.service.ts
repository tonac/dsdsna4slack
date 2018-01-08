import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { error } from 'util';

@Injectable()
export class ShareService {

    constructor(private http: Http, private userService: UserService) {
    }

    setShare(resultID: string): Observable<boolean> {
        return this.http.put(
            '/api/analysis/v1/overall-metrics/' + resultID + '/',
            this.userService.jwt()
        ).map((response: Response) => {
            console.log(response);
            return response.status == 200;
        })
    }
}