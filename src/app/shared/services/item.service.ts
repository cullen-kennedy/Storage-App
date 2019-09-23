import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service'
import { Observable, of } from 'rxjs';

import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';


@Injectable()
export class ItemService {
    baseUrl = 'http://localhost:8080/';
    queryUrl: string = '?search=';

    constructor(private http: HttpClient, private User: UserService) {}

    search(terms: Observable<string>) {
        return terms.pipe(debounceTime(400),
                            distinctUntilChanged(),
                            switchMap(term => this.searchEntries(term)))
      }
    
    searchEntries(term): Observable<Item[]> {
    return this.http
        .get<Item[]>(this.baseUrl + "api/items" + this.queryUrl + term, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('id_token'))
        })
        .pipe(map(res => res['payload'].map(data => new Item().deserialize(data))),
        catchError(error => of(null))
    )}

    public deleteItem(id: number): Observable<{}> {
        return this.http.delete(this.baseUrl + "api/items/" + id, {
            headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('id_token'))
        })
    }
}
