
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { User } from '../Models/User';
import { enviroment } from '../enviroments/enviroment';
import { UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
 endPoint =  enviroment.endPoint;
 url = this.endPoint + "User/"

  constructor(private http: HttpClient) { }
  listUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}List`);
  }
  addUser(model: User) : Observable<User>{
    return this.http.post<User>(`${this.url}Add`,model)
  }
  updateUser(model: User, idUser: number) : Observable<User>{
    return this.http.put<User>(`${this.url}Update/${idUser}`,model);
  }
  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}Delete${id}`);
  }
  verifyEmail(email : string): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}EmailExist/${email}`);
  }
  getUser(id : number) : Observable<number>{
    return this.http.get<number>(`${this.url}GetUser/${id}`);
  }
  getCompleteUser(id : number) : Observable<User>{
    return this.http.get<User>(`${this.url}GetTotalUser/${id}`);
  }
  getSellers():Observable<User[]>
  {
      return this.http.get<User[]>(this.url+"Seller");
  }
}
