import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Manager } from "./storagemanager/manager.component";

import { ItemService } from './shared/services/item.service';

import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContainerService } from './shared/services/container.service';
import { SearchContainer } from './storagemanager/itemManager/searchContainer/searchContainer.component';
import { ContainerList } from './storagemanager/containerManager/containerList/containerList.component';
import { ContainerMenu } from './storagemanager/containerManager/containerMenu/containerMenu.component';
import { ContainerManager } from './storagemanager/containerManager/containerManager.component';
import { ItemManager } from './storagemanager/itemManager/itemManager.component';
import { ItemMenu } from './storagemanager/itemManager/itemMenu/itemMenu.component';
import { ContainerAttributeService } from './shared/services/containerAttribute.service';
import { Login } from './home/login.component';
import { UserService } from './shared/services/user.service';
import {  AuthGuardService } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Home } from './home/home.component';

let routes = [
  { path: "home",  component: Home},
  { path: "", component: Manager, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    Manager,
    ItemMenu,
    ItemManager,
    SearchContainer,
    ContainerList,
    ContainerMenu,
    ContainerManager,
    Login,
    Home
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
    ContainerAttributeService,
    UserService,
    AuthService,
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
