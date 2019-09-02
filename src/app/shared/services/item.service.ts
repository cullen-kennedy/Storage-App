import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';


@Injectable()
export class ItemService {
    baseUrl = 'http://localhost:12343/api/items';
    queryUrl: string = '?search=';

    constructor(private http: HttpClient) {}

    search(terms: Observable<string>) {
        return terms.pipe(debounceTime(400),
                            distinctUntilChanged(),
                            switchMap(term => this.searchEntries(term)))
      }
    
    searchEntries(term): Observable<Item[]> {
    return this.http
        .get<Item[]>(this.baseUrl + this.queryUrl + term)
        .pipe(map(res => res['payload'].map(data => new Item().deserialize(data))),
        catchError(error => of(null))
    )}
}
