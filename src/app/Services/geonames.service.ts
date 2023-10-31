

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoNamesService {
    private apiUrl = 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward';

    private headers = new HttpHeaders({
      'X-RapidAPI-Key': '81eb58f566mshd228c280cb28728p1aa7c2jsnc1e57849a6ce',
      'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
    });
  
    constructor(private http: HttpClient) {}
  
    getCoordinates(city: string, country: string): Observable<any> {
      const params = {
        city,
        country,
        'accept-language': 'en',
        polygon_threshold: '0.0'
      };
  
      return this.http.get(this.apiUrl, { params, headers: this.headers });
    }
}