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
    publication.idBreed = 2;
    return this._http.post<Publication>(`${this.url}Add`,publication);
  }
}
