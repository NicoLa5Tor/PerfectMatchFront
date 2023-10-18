import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../Services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tok: TokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.tok.getTok("Token"); 
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  
    // Envía la solicitud clonada con el encabezado de autorización
    return next.handle(authReq);
  }
}