import { Component } from "@angular/core";

@Component({
  selector: "item-search",
  templateUrl: "itemSearch.component.html",
  styleUrls: ["itemSearch.component.scss"]
})

export class ItemSearch {
public containerLink: string

  //Current container link - input to containerBox
  updateContainer(link) {
    this.containerLink = link
  }
}

