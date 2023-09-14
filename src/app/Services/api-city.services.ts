import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { City } from "../Models/City";
import { enviroment } from "../enviroments/enviroment";


@Injectable({
    providedIn:"root"
})
export class ApiCityService{
    endPoint : string = enviroment.endPoint;
    url : string = this.endPoint + "city/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<City[]>
    {
        return this._http.get<City[]>(`${this.url}List`);
    }
}