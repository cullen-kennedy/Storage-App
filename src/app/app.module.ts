import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatProgressSpinnerModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Manager } from "./storagemanager/manager.component";
import { ItemList } from "./storagemanager/itemList/itemList.component";
import { SideBar } from './storagemanager/sidebar/sidebar.component';

import { DataService } from './shared/services/data.service';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { ContainerBox } from './storagemanager/containerBox/containerBox.component';
import { FormsModule } from '@angular/forms';

let routes = [
  { path: "",  component: Manager}
];

@NgModule({
  declarations: [
    AppComponent,
    Manager,
    ItemList,
    SideBar,
    ContainerBox
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false, //Debugging of the routes

    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
