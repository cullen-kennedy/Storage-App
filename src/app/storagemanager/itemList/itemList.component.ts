import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {debounceTime, distinctUntilChanged, tap, } from 'rxjs/operators';
import {ItemsDataSource} from "../../shared/services/itemsSource.service";
import { fromEvent } from 'rxjs';

@Component({
    selector: "item-list",
    templateUrl: "itemList.component.html",
    styleUrls: ["itemList.component.css"]
})

export class ItemList implements OnInit, AfterViewInit{
    constructor(protected dataService: DataService) {}

    dataSource: ItemsDataSource 
    
    displayedColumns= ["name", "container_name"];

    @ViewChild('input', { static: false }) input: ElementRef;

    @Output() someEvent = new EventEmitter<string>();

    getContainer(link) {
        this.someEvent.next(link);
    }
    ngOnInit() {
        this.dataSource = new ItemsDataSource(this.dataService);
    }

    ngAfterViewInit() {

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.searchItems();
                })
            )
            .subscribe(); 
    }

    searchItems() {
        this.dataSource.loadItems(this.input.nativeElement.value);     
    }  
}

