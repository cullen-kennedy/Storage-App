import { Component } from "@angular/core";

@Component({
  selector: "the-manager",
  templateUrl: "manager.component.html",
  styleUrls: ["manager.component.scss"]

})

export class Manager {

  view: boolean = false;

  setViewSearcher() {
    this.view = false;
  }

  setViewContainers() {
    this.view = true;
  }

}

