import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnimalType } from "../Models/AnimalType";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})
export class ApiAnimalTypeService{
    url = "https://localhost:7286/AnimalType/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<AnimalType[]>
    {
        return this._http.get<AnimalType[]>(this.url+"List");
    }
}