import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as moment from "moment";

import { map } from 'rxjs/operators';


@Injectable()
export class UserService {
    baseUrl = 'http://localhost:8080/';
    
    private _token: string = "";

    constructor(private http: HttpClient) {}

    getToken() {
        return this._token;
    }

    login(creds): Observable<boolean> {
        return this.http
            .post(this.baseUrl + "api/users/signin", creds)
            .pipe(
            map((data: any) => {
                this.setSession(data)
                return true;
            }));
    }

    setSession(data) {
        const expiresAt = moment().add(data.expiresIn,'second');

        localStorage.setItem('id_token', data.accessToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }
}
