import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Login } from '../Models/Login';
import { ResponseLogin } from '../Models/ResponseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endPoint : String = enviroment.endPoint;
  url : string = this.endPoint + "Login/";

  constructor(private http : HttpClient) {

   }
   LoginAuthenticate(form : Login ) : Observable<ResponseLogin>
   {
    return this.http.post<ResponseLogin>(`${this.url}Authenticate`,form);
   }
}
