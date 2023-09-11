import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Breed } from "../Models/Breed";
import { enviroment } from "../enviroments/enviroment";


@Injectable({
    providedIn:"root"
})
export class ApiBreedService{
    endPoint : string = enviroment.endPoint;
    url : string = this.endPoint + "Breed/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<Breed[]>
    {
        return this._http.get<Breed[]>(`${this.url}List`);
    }
}