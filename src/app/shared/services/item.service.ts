import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {Item} from '../models/item.model'

import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';


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
    
    searchEntries(term) {
    return this.http
        .get(this.baseUrl + this.queryUrl + term)
        .pipe(map((response: any) => response['payload']),
        catchError(error => of(null))
    )}
}
