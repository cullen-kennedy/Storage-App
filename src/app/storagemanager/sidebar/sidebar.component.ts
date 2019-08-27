import { Component } from "@angular/core";
import { DataService } from '../../shared/services/data.service';
import { Item } from '../../shared/models/item.model';
import { ItemsDataSource } from '../../shared/services/itemsSource.service';

@Component({
  selector: "side-bar",
  templateUrl: "sidebar.component.html",
  styleUrls: ["sidebar.component.css"] 

})

export class SideBar {
  constructor(protected dataService: DataService) {}

  public containerLink: string

  //Current container link - input to containerBox
  updateContainer(link) {
    this.containerLink = link
  }
    
}
