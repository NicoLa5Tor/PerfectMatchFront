import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../Models/publication';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiPublicationService {
 url="https://localhost:7098/api/publications";
  constructor(private _http:HttpClient) { }
  public getPublications():Observable<Publication[]>
  {
    return this._http.get<Publication[]>(this.url);
  }
  public AddPublications(publication:Publication)
  {
    this._http.post(this.url,publication,httpOption);
  }
}
