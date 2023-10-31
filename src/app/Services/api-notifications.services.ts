import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../Models/Notification';
import { Response } from '../Models/Response/Response';

@Injectable({
  providedIn: 'root'
})
export class notificationService {
    endPoint : string = enviroment.endPoint;
    url : string = this.endPoint + "User/";
    constructor(private _http:HttpClient) {
    }
    setNotification(notification:Notification):Observable<Notification>
    {
        return this._http.post<Notification>(this.url+"Notification",notification);
    }
    getNotifications(id:number):Observable<Notification[]>
    {
        return this._http.get<Notification[]>(this.url+"Notifications/"+id);
    }
    removeNotification(id:number):Observable<Response>
    {
        return this._http.delete<Response>(this.url+"Notification/"+id);
    }
}