import { Injectable } from '@angular/core';
import { Inject, inject } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ApiUserService } from './api-user.service';
import { User } from '../Models/User';
import { da } from 'date-fns/locale';
import { map } from 'rxjs/operators';
import { data } from 'autoprefixer';



@Injectable({
  providedIn: "root"
}

)
export class TokenService {
  private token!: string
  private refresh!: string
  private idRoll!: number
  constructor(private _userService: ApiUserService) { }
  setToken(tok: string, name: string) {
    this.token = tok;
    document.cookie = `${name}=${tok};path=/`;
  }
  getTok(name: string) {
    const cookies = this.getCookie(name)
    // console.log(cookies);
    return cookies;
  }
  getCookie(nombre: string) {
    var nombreEQ = nombre + "=";
    var cookies = document.cookie.split(';'); // Divide la cadena en todas las cookies
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreEQ) == 0) {
        return cookie.substring(nombreEQ.length, cookie.length);
      }
    }
    return null; // Devuelve null si la cookie no se encuentra
  }
  deleteCookie(nombre: string) {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  isTokenExpired(token: string): boolean {
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar la parte del payload del token
    const expirationTimestamp = tokenData.exp * 1000; // Multiplicar por 1000 para convertir segundos a milisegundos
    const currentTimestamp = Date.now(); // Obtener la marca de tiempo actual en milisegundos


    return currentTimestamp > expirationTimestamp;
  }
  getIdUser() {
    const jwtTok = this.getTok("Token") || "";
    const decodedToken: JwtPayload = jwtDecode(jwtTok);
    const userId = (decodedToken as any).nameid;
    if (userId != null && userId != "") {
      return parseInt(userId);
    } else {
      return 0
    }
  }

}
