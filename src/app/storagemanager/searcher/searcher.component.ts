import { Component } from "@angular/core";

@Component({
  selector: "searcher",
  templateUrl: "searcher.component.html",
  styleUrls: ["searcher.component.scss"]
})

export class Searcher {
public containerLink: string

  //Current container link - input to containerBox
  updateContainer(link) {
    this.containerLink = link
  }
}

