import {  Component, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs';


import { ItemService } from 'src/app/shared/services/item.service'
import { Item } from 'src/app/shared/models/item.model';

@Component({
    selector: "item-menu",
    templateUrl: "itemMenu.component.html",
    styleUrls: ["itemMenu.component.scss"]
})

export class ItemMenu {
    
    searchTerm$ = new Subject<string>();
    results: Item[] = []; 

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

