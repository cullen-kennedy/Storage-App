import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Manager } from "./storagemanager/manager.component";
import { ItemList } from "./storagemanager/searcher/itemList/itemList.component";

import { ItemService } from './shared/services/item.service';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContainerService } from './shared/services/container.service';
import { Searcher } from './storagemanager/searcher/searcher.component';
import { SearchContainer } from './storagemanager/searcher/searchcontainer/searchcontainer.component';

let routes = [
  { path: "",  component: Manager}
];

@NgModule({
  declarations: [
    AppComponent,
    Manager,
    ItemList,
    Searcher,
    SearchContainer
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
    ContainerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
