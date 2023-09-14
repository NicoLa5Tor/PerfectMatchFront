import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { gender } from "../Models/Gender";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments/enviroment";


@Injectable({
    providedIn:"root"
})
export class ApiGenderService{
    endPoint : string = enviroment.endPoint;
     url : string = this.endPoint + "Gender/";
    constructor(private _http:HttpClient) {
    }
    getGenders():Observable<gender[]>
    {
        return this._http.get<gender[]>(`${this.url}List`);
    }
}