import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TranslatService {
       private rapidApiKey = '81eb58f566mshd228c280cb28728p1aa7c2jsnc1e57849a6ce';
        private rapidApiHost = 'text-translator2.p.rapidapi.com';
        private translateUrl = 'https://text-translator2.p.rapidapi.com/translate';
    constructor(private httpClient: HttpClient, private timeZone: TranslateService) { }
    translate(trans: string, targetLanguage : string) : Observable <any> {
     
          const headers = new HttpHeaders({
            'X-RapidAPI-Key': this.rapidApiKey,
            'X-RapidAPI-Host': this.rapidApiHost
          });
      
          const params = new HttpParams()
            .set('source_language', 'es')
            .set('target_language', targetLanguage)
            .set('text', trans);
      
          return this.httpClient.post(this.translateUrl, params, { headers: headers });
        }
    
    translatePrice(price: any) {
        const trans: any = this.timeZone.currentLang;
       // console.log("El horario es : ",trans)
        switch (trans) {
            case 'es-CO':
                return price;
                break;
            case 'en':
                return price * 0.00024;
                break;
            case 'fr':
                return price * 0.00023;
                break;
            case 'pt-PT':
                return price * 0.00023;
                break;
            case 'de':
                return price * 0.00023;
                break;
        }
    }
}
