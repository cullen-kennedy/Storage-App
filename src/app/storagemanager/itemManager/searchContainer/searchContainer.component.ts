import { Component, Input } from "@angular/core";
import { Container } from 'src/app/shared/models/container.model';
import { ContainerItem, ContainerItemForCreation } from 'src/app/shared/models/containerItem.model';
import { ContainerService } from 'src/app/shared/services/container.service';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: "search-container",
  templateUrl: "searchContainer.component.html",
  styleUrls: ["searchContainer.component.scss"]
})

export class SearchContainer {
    constructor(private data: ContainerService, private itemData: ItemService) {}

    _containerLink: string;
    newItem: string;
    currentContainer: Container;
    currentContainerItems: ContainerItem[];

  @Input() 
  public set containerLink(val: string) {
    this._containerLink = val;
    //Initial value is nothing, don't show container
    if (!val) {
      return
    }
    this.showContainerInfo();
    this.loadContainerItems();
  }

   //Not much to these load container functions
   showContainerInfo(){
    this.data.getContainer(this._containerLink).subscribe(
        container => this.currentContainer = container
      );
  }
  loadContainerItems(){
    this.data.loadContainerItems(this._containerLink).subscribe(
        items =>  this.currentContainerItems = items
      );
  }

  //Done a little differently
  addItemToContainer() {
    let newItem = new ContainerItemForCreation()
    newItem.name = this.newItem;

    this.data.addItemToContainer(this._containerLink, newItem).subscribe(
      success => {
            if (success) {
                console.log("Successfully added item") 
                this.loadContainerItems()
            }
      },
      error => console.log('HTTP Error', error) 
    );
  }

  deleteItem(id) {
    //Calls /item/:id... may want to change to containers/:Cid/items/:Iid for consistency?
    this.itemData.deleteItem(id).subscribe(
      success => {
            if (success) {
                console.log("Successfully deleted item") 
                this.loadContainerItems()
            }
      },
      error => console.log('HTTP Error', error) 
    );
  }

  deleteContainer(id) {
    //Danger zone... will cascade!
  }
}

