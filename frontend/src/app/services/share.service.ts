import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { error } from 'util';

@Injectable()
export class ShareService {

    constructor(private http: Http, private userService: UserService) {
    }

    setShare(resultID: number, shouldShare: boolean): Observable<boolean> {
        return this.http.post(
            '/api/analysis/v1/overall-metrics/', 
            [resultID, shouldShare],
            this.userService.jwt()
        ).map((response: Response) => {
            return response.status == 200;
        })
    }
}