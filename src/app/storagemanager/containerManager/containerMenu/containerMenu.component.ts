import {  Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ContainerAttributeService } from 'src/app/shared/services/containerAttribute.service';
import { ContainerForCreation } from 'src/app/shared/models/container.model';
import { ContainerService } from 'src/app/shared/services/container.service';


@Component({
    selector: "container-menu",
    templateUrl: "containerMenu.component.html",
    styleUrls: ["containerMenu.component.scss"]
})

export class ContainerMenu implements OnInit{


    newContainer = {
        name: "",
        categoryId: "",
        locationId: ""
    };

    @Output() locationEvent = new EventEmitter<string>();
    @Output() categoryEvent = new EventEmitter<string>();

    constructor(protected data: ContainerAttributeService, private containerData: ContainerService) {}

    ngOnInit(): void {
        this.data.loadLocations()
            .subscribe(success => {
                if (success) {
                    console.log("loaded locations")
                }
            });

        this.data.loadCategories()
        .subscribe(success => {
            if (success) {
                console.log("loaded categories")
            }   
        });   
        this.locationEvent.next(); 
        this.categoryEvent.next();
    }

    sendLocation(location) {
        this.locationActive(location)
        this.locationEvent.next(location);
    }

    sendCategory(category) {
        this.categoryActive(category)
        this.categoryEvent.next(category);
    }

    locationActive(location) {
        const locationSelectors = document.querySelectorAll('.location-selector')

        locationSelectors.forEach(selector => {
            if (selector.id === location) {
                selector.setAttribute('class', 'btn location-selector selected' )
            }
            else {
                selector.setAttribute('class', 'btn location-selector' )
            }
        })

    }

    categoryActive(category) {
        const categorySelectors = document.querySelectorAll('.category-selector')

        categorySelectors.forEach(selector => {

            if (selector.id === category) {
                selector.setAttribute('class', 'btn category-selector selected' )
            }
            else {
                selector.setAttribute('class', 'btn category-selector' )
            }
        })

    }

    addContainer() {
        console.log(this.newContainer);

        let containerForCreation = new ContainerForCreation();

        containerForCreation.name = this.newContainer.name;
        containerForCreation.categoryId = parseInt(this.newContainer.categoryId);
        containerForCreation.locationId = parseInt(this.newContainer.locationId);

        this.containerData.addContainer(containerForCreation).subscribe(
            success => {
                    if (success) {
                        console.log("Successfully added container") 
                        //Todo: Reload container list!
                    }
            },
            error => console.log('HTTP Error', error) 
        );
        
    }

}