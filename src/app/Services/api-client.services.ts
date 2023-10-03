import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Client } from "../Models/Client";
import { enviroment } from "../enviroments/enviroment";


@Injectable({
    providedIn:"root"
})
export class ApiClientService{
    
    endPoint : string = enviroment.endPoint;
    url : string = this.endPoint + "User/";
    constructor(private _http:HttpClient) {
    }
    getClients():Observable<Client[]>
    {
        return this._http.get<Client[]>(this.url+"List");
    }
    getSellers():Observable<Client[]>
    {
        return this._http.get<Client[]>(this.url+"Seller");
    }
}