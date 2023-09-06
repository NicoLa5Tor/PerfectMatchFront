import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../Models/publication';
import { Observable } from 'rxjs';
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
}
