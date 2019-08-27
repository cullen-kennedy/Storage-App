import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Item} from "../models/item.model";
import {DataService} from "./data.service";
import {catchError, finalize} from "rxjs/operators";


//Taken from a mat table guide online. Copied fairly naively. 
//Possibly change container and containerItem to be similiar? 

export class ItemsDataSource implements DataSource<Item> {

    private itemsSubject = new BehaviorSubject<Item[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(protected dataService: DataService) {

    }

    loadItems(filter:string) {

        this.loadingSubject.next(true);

        this.dataService.findItems(filter, 
            ).pipe(
                catchError(() => of([])),
                finalize(() => {this.loadingSubject.next(false)})
            )
            .subscribe(items => this.itemsSubject.next(items));
            
    }

    connect(collectionViewer: CollectionViewer): Observable<Item[]> {
        console.log("Connecting data source");
        return this.itemsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }

}