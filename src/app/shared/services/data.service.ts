import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from '../models/item.model';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Container } from '../models/container.model';
import { ContainerItem } from '../models/containerItem.model';

/**
 * Todo:
 *    1. Research and find consistent methods for returning data/errors.
 *    2. Once get containers with filter is implemented, add it.
 *    3. Possibly divide data service up into respective modules.
 */

@Injectable()
export class DataService {
    constructor(public http: HttpClient) { 
    }

    baseurl: string = 'http://localhost:12343/'

    /**
     * Finds items. Returns Observable of Item array
     * @param filter String for searching items
     */
    findItems(filter):  Observable<Item[]> {
        return this.http.get(`${this.baseurl}api/items`, {
            params: new HttpParams()
                .set('search', filter)
        }).pipe(
            map(res =>  res["payload"]) 
        );
    }

    /**
     * Loads the current container items. Returns observable of ContainerItem array
     * @param link Chosen link from quicksearch
     */
    public loadContainerItems(link: string): Observable<ContainerItem[]> {
        return this.http.get<ContainerItem[]>(`${this.baseurl}${link}/items`).pipe(
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
        return this.http.post(`${this.baseurl}${link}/items`, item)
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
    return this.http.get<Container>(`${this.baseurl}${link}`).pipe(
      map(data => new Container().deserialize(data)),
      catchError(error => of(null))
    );
  }
}