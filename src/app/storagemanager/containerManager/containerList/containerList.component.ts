import {  Component, Input, Output, EventEmitter } from '@angular/core';
import { Container } from 'src/app/shared/models/container.model';
import { ContainerService } from 'src/app/shared/services/container.service';


@Component({
    selector: "container-list",
    templateUrl: "containerList.component.html",
    styleUrls: ["containerList.component.scss"]
})

export class ContainerList {

    constructor(private data: ContainerService) {}

   containerLink: string; 
   _containersLink: string;
   containersList: Object

  @Input() 
  public set containersLink(val: string) {
    this._containersLink = val;
    //Initial value is nothing, don't show container
    if (!val) {
      return
    }
    this.updateContainersList() 
  }

  updateContainersList() {
    this.data.getContainers(this._containersLink).subscribe(
        results => {this.containersList = results}
    ); 
  }

  updateContainerLink(link) {
      this.containerLink = link
  }

}