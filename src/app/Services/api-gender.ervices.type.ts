import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { gender } from "../Models/Gender";
import { Observable } from "rxjs";


@Injectable({
    providedIn:"root"
})
export class ApiGenderService{
    url = "https://localhost:7286/Gender/";
    constructor(private _http:HttpClient) {
    }
    getGenders():Observable<gender[]>
    {
        return this._http.get<gender[]>(this.url+"List");
    }
}