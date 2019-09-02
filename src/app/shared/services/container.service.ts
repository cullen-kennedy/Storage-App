import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import {Item} from '../models/item.model'

import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Container } from '../models/container.model';
import { ContainerItem } from '../models/containerItem.model';


@Injectable()
export class ContainerService {
    baseUrl = 'http://localhost:12343/';

    constructor(private http: HttpClient) {}

    /**
     * Loads the current container items. Returns observable of ContainerItem array
     * @param link Chosen link from quicksearch
     */
    public loadContainerItems(link: string): Observable<ContainerItem[]> {
        return this.http.get<ContainerItem[]>(`${this.baseUrl}${link}/items`).pipe(
          map(data => data.map(data => new ContainerItem().deserialize(data)),
          catchError(error => of(null))
        ));
      }

    /**
     * Adds Item to current container
     * @param link Link of current container
     * @param item Item model - name and date
     */  
    public addItemToContainer(link, item): Observable<boolean> {
        return this.http.post(`${this.baseUrl}${link}/items`, item)
            .pipe(map(response => {return true;}, //change this 
            catchError(error => {
              return throwError(error)})
            ));
    }
    
   /**
    * Get current container
    * @param link Link to desired container, determined in quicksearch
    */ 
   public getContainer(link: string): Observable<Container> {
    return this.http.get<Container>(`${this.baseUrl}${link}`).pipe(
      map(data => new Container().deserialize(data)),
      catchError(error => of(null))
    );
    }

    public getContainers(link: string): Observable<Container[]> {
      console.log(link)
      return this.http.get<Container[]>(`${this.baseUrl}${link}`)
        .pipe(map(res => res['payload'].map(data => new Container().deserialize(data))),
        catchError(error => of(null)))
    }

    
}


