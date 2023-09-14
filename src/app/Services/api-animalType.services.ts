import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnimalType } from "../Models/AnimalType";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments/enviroment";


@Injectable({
    providedIn:"root"
})
export class ApiAnimalTypeService{
    endPoint : string = enviroment.endPoint;
    url : string = this.endPoint + "AnimalType/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<AnimalType[]>
    {
        return this._http.get<AnimalType[]>(`${this.url}List`);
    }
}