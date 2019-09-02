import { Component } from "@angular/core";

@Component({
  selector: "container-search",
  templateUrl: "containerSearch.component.html",
  styleUrls: ["containerSearch.component.scss"]
})

export class ContainerSearch {


  public location: string = "";
  public category: string = "";
  public containersLink: string;

  updateLocation(location) {
    this.location = location || ""
    this.updateContainersLink()
  }  

  updateCategory(category) {
    this.category = category || ""
    this.updateContainersLink()
  }
  //Current container link - input to containerBox
  updateContainersLink() {
    this.containersLink = `api/containers?category=${this.category}&location=${this.location}`
  }
}

