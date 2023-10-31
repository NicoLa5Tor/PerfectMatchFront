import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Login } from '../Models/Login';
import { ResponseLogin } from '../Models/ResponseLogin';
import { RefreshToken } from '../Models/RefreshTok';
import { Email } from '../Models/Request/Email';
import { NewPass } from '../Models/Request/NewPass';
import { Injectable } from '@angular/core';
import { Response } from "../Models/Response/Response";

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
    console.log("Datos ", form)
    return this.http.post<ResponseLogin>(`${this.url}Authenticate`,form);
   }
   RefreshToken(tok : RefreshToken) : Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.url}obtainRefreshToken`,tok);
   }
   validateToken(token:string):Observable<Response>
   {
       return this.http.get<Response>(`${this.url}ValidationToken?token=${token}`);
   }
   createToken(email:Email):Observable<Response>
   {
       return this.http.post<Response>(`${this.url}RecoverPassToken`,email);
   }
   updatePass(obj:NewPass):Observable<Response>
   {
       return this.http.post<Response>(`${this.url}NewPassword`,obj);
   }
}
