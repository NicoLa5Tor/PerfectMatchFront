

import { Injectable , inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorCom } from '../Models/Error';
import { TranslatService } from './Translate.service';
import { TimeZoneService } from './time-zone.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class ErrorService {
     mod! : ErrorCom;
     constructor(private trans : TranslatService){}
   setComponent(model : ErrorCom){
     this.mod = model;
   }
   getComponent(){
    return this.mod;

   }

}