import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "./item"
import {Observable} from "rxjs"
import { map } from "rxjs/operators";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    public items: Item[] = [];

    loadItems(): Observable<boolean> {
        return this.http.get("http://localhost:12343/api/items")
            .pipe(
                map((data: any[]) => {
                    this.items = data;
                    return true;
                })
            )
    }
}