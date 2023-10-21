import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
private token!: string
private refresh! : string
private idUser! : number

 setToken(tok : string, name : string){
  this.token = tok;
  document.cookie = `${name}=${tok};path=/`;
 }
 getTok(name : string){
  const cookies = this.getCookie(name)
 // console.log(cookies);
  return cookies;
 }
 getCookie(nombre : string) {
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

setId(id : number){
  if(id != null) this.idUser = id;
}

getId():number{
  return this.idUser
}

}
