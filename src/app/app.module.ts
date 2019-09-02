import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Manager } from "./storagemanager/manager.component";

import { ItemService } from './shared/services/item.service';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContainerService } from './shared/services/container.service';
import { SearchContainer } from './storagemanager/itemSearch/searchContainer/searchContainer.component';
import { ContainerList } from './storagemanager/containerSearch/containerList/containerList.component';
import { ContainerMenu } from './storagemanager/containerSearch/containerMenu/containerMenu.component';
import { ContainerSearch } from './storagemanager/containerSearch/containerSearch.component';
import { ItemSearch } from './storagemanager/itemSearch/itemSearch.component';
import { ItemMenu } from './storagemanager/itemSearch/itemMenu/itemMenu.component';
import { ContainerAttributeService } from './shared/services/containerAttribute.service';

let routes = [
  { path: "",  component: Manager}
];

@NgModule({
  declarations: [
    AppComponent,
    Manager,
    ItemMenu,
    ItemSearch,
    SearchContainer,
    ContainerList,
    ContainerMenu,
    ContainerSearch
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false, //Debugging of the routes

    }),
    HttpClientModule
  ],
  providers: [
    ItemService,
    ContainerService,
    ContainerAttributeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
