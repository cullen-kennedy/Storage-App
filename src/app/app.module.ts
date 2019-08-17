import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { Manager } from "./storagemanager/manager.component";
import { ItemList } from "./storagemanager/itemList.component";

import { DataService } from './shared/dataService';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

let routes = [
  { path: "",  component: Manager}
];

@NgModule({
  declarations: [
    AppComponent,
    Manager,
    ItemList
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false, //Debugging of the routes

    }),
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
