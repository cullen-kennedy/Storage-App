import { Component, Input, OnInit } from "@angular/core";
import { ItemsDataSource } from '../../shared/services/itemsSource.service';
import { Item } from '../../shared/models/item.model';
import { Container } from 'src/app/shared/models/container.model';
import { DataService } from 'src/app/shared/services/data.service';
import { ContainerItem,ContainerItemForCreation } from 'src/app/shared/models/containerItem.model';

@Component({
  selector: "the-container-box",
  //Using plain table for just listing the items with no filters/restrictions
  templateUrl: "containerBox.component.html",
  styleUrls: ["containerBox.component.css"]

})

export class ContainerBox {

  constructor(private data: DataService) {
  }

  _containerLink: string;
  newItem: string;
  currentContainer: Container;
  currentContainerItems: ContainerItem[];

  //Input from itemList selection.
  //Value is selected link 'containers/:id'
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

