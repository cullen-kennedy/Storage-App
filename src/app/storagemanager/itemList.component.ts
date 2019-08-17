import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Item } from "../shared/item";

@Component({
    selector: "item-list",
    templateUrl: "itemList.component.html",
    styleUrls: []
})

export class ItemList implements OnInit{
    constructor(private data: DataService) {}

    public items: Item[] = [];
    public filteredItems: Item[] = [];
    private _searchTerm: string;

    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filteredItems = this.filterItems(value)
    }

    filterItems(searchString: string) {
        return this.items.filter(item => 
            item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
    }
    ngOnInit(): void {
        this.data.loadItems()
        .subscribe(success => {
            if (success) {
            this.items = this.data.items;
            this.filteredItems = this.data.items
            }
        });
    }

}