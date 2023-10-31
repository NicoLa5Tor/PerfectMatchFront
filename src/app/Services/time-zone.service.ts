import { Injectable,NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  private currentLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('es-CO');

  getLanguage() {
  //  console.log("El leng es: "+ this.currentLanguage.value)
    return this.currentLanguage.asObservable();
  }

  setLanguage(language: string) {
    this.currentLanguage.next(language);
  //  console.log("Nuevo idioma: " + language);
  }
}
