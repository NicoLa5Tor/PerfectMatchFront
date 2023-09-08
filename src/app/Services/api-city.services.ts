import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { City } from "../Models/City";


@Injectable({
    providedIn:"root"
})
export class ApiCityService{
    url = "https://localhost:7286/City/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<City[]>
    {
        return this._http.get<City[]>(this.url+"List");
    }
}