import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../Models/publication';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiPublicationService {
  endPoint : string = enviroment.endPoint;
  url : string = this.endPoint + "Publication/";
  constructor(private _http:HttpClient) { }
  public getPublications():Observable<Publication[]>
  {
    return this._http.get<Publication[]>(`${this.url}List`);
  }
  public AddPublications(publication:Publication):Observable<Publication>
  {
    return this._http.post<Publication>(`${this.url}Add`,publication);
  }
  public UserPublications(idUser: number): Observable<Publication[]>{
    return this._http.get<Publication[]>(`${this.url}userList/${idUser}`);
  }
  public DeletePublication(idPublication: number): Observable<void>{
    return this._http.delete<void>(`${this.url}Delete/${idPublication}`);
  }
  public UpdatePublication(idPublication:number, model: Publication): Observable<Publication>{
   return this._http.put<Publication>(`${this.url}Update/${idPublication}`,model);
  }
}
