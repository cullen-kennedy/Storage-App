import {  Component, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs';


import { ItemService } from 'src/app/shared/services/item.service'
import { Item } from 'src/app/shared/models/item.model';

@Component({
    selector: "item-list",
    templateUrl: "itemList.component.html"
})

export class ItemList {
    
    searchTerm$ = new Subject<string>();
    results: Object; //Object is payload. maybe change to Item[] for consistency or vice versa?

    @Output() someEvent = new EventEmitter<string>();

    constructor(protected itemService: ItemService) {
        this.itemService.search(this.searchTerm$)
            .subscribe(results => {
            this.results = results;
      });
    }
    getContainer(link) {
        this.someEvent.next(link);
    }




   

   

    
}

