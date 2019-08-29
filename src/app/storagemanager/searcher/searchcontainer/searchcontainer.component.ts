import { Component, Input } from "@angular/core";
import { Container } from 'src/app/shared/models/container.model';
import { ContainerItem, ContainerItemForCreation } from 'src/app/shared/models/containerItem.model';
import { ContainerService } from 'src/app/shared/services/container.service';

@Component({
  selector: "search-container",
  templateUrl: "searchcontainer.component.html"
})

export class SearchContainer {
    constructor(private data: ContainerService) {}

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
}

