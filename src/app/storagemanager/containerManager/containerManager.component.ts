import { Component } from "@angular/core";

@Component({
  selector: "container-manager",
  templateUrl: "containerManager.component.html",
  styleUrls: ["containerManager.component.scss"]
})

export class ContainerManager {


  public location: string = "";
  public category: string = "";
  public containersLink: string;

  public containerLink: string

  //Current container link - input to containerBox
  updateContainer(link) {
    this.containerLink = link
  }

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

