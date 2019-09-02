import {  Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ContainerAttributeService } from 'src/app/shared/services/containerAttribute.service';


@Component({
    selector: "container-menu",
    templateUrl: "containerMenu.component.html",
    styleUrls: ["containerMenu.component.scss"]
})

export class ContainerMenu implements OnInit{


    @Output() locationEvent = new EventEmitter<string>();
    @Output() categoryEvent = new EventEmitter<string>();

    constructor(protected data: ContainerAttributeService) {}

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

}