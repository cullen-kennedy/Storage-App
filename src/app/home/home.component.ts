import { Component } from "@angular/core";

@Component({
  selector: "the-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]

})

export class Home {

  view: boolean = false;

  setViewLogin() {
    this.view = false;
  }

  setViewRegister() {
    this.view = true;
  }

}

