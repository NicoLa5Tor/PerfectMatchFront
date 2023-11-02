import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnimalType } from "../Models/AnimalType";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments/enviroment";
import { Movement } from "../Models/Movement";


@Injectable({
    providedIn:"root"
})
export class MovementService {
    endPoint : String = enviroment.endPoint;
    url : string = this.endPoint + "Movement/";
    constructor(private _http:HttpClient){}
    public getMovements():Observable<Movement[]>{
        return this._http.get<Movement[]>(this.url+"GetMovements")
    }
    public AddMovements(Movement:Movement):Observable<Movement>{
        return this._http.post<Movement>(this.url+"AddMovement",Movement);
    }
}