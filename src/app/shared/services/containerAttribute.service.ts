import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { ContainerItem } from '../models/containerItem.model';


@Injectable()
export class ContainerAttributeService {
    baseUrl = 'http://localhost:12343/';

    locations: any[]
    categories: any[]

    constructor(private http: HttpClient) {}

    /**
     * Loads the current container items. Returns observable of ContainerItem array
     * @param link Chosen link from quicksearch
     */
    public loadLocations(): Observable<boolean> {
        if (this.locations) {
            console.log("locations already loaded")
            return of(true);
        }
        else {
            console.log("loading locations")
            return this.http.get<any>(`${this.baseUrl}api/locations`).pipe(
            map(data => {
                this.locations = data
                return true
            }),
            catchError(error => of(null))
            );
        }
    }

    public loadCategories(): Observable<boolean> {
        if (this.categories) {
            console.log("categories already loaded")
            return of(true);
        }
        else {
            console.log("loading categories")
            return this.http.get<any>(`${this.baseUrl}api/categories`).pipe(
            map(data => {
                this.categories = data
                return true
            }),
            catchError(error => of(null))
            );
        }
    }

}