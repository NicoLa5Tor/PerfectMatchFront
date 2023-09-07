import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Breed } from "../Models/Breed";


@Injectable({
    providedIn:"root"
})
export class ApiBreedService{
    url = "https://localhost:7286/Breed/";
    constructor(private _http:HttpClient) {
    }
    getAnimalType():Observable<Breed[]>
    {
        return this._http.get<Breed[]>(this.url+"List");
    }
}