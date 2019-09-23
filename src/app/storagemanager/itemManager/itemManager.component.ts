import { Component } from "@angular/core";

@Component({
  selector: "item-manager",
  templateUrl: "itemManager.component.html",
  styleUrls: ["itemManager.component.scss"]
})

export class ItemManager {
public containerLink: string

  //Current container link - input to containerBox
  updateContainer(link) {
    this.containerLink = link
  }
}

