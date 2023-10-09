import { inject } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const ValidateToken = () => {
    const rout = inject(Router);

    const jwtTok = localStorage.getItem('token_user');
    if (jwtTok) {
        try {
            // Decodifica el token JWT
            const decodedToken : JwtPayload = jwtDecode(jwtTok);
          
         //       const id = decodedToken.sub;
        
         
          //  const userId = (decodedToken as any).nameid;
            //console.log('ID del usuario:', userId);
       
           
         const currentTimestamp = Math.floor(Date.now() / 1000); 
         console.log("Tiempo Restante: ",decodedToken.exp);
        
       if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
        console.log('El token JWT está vigente.');
        // El token está vigente, puedes permitir el acceso a recursos protegidos.
      } else {
        localStorage.removeItem('token_user');
        console.log('El token JWT ha caducado.');
        // El token ha caducado, puedes redirigir al usuario al inicio de sesión u otras acciones apropiadas.
      }        
            // Imprime todos los datos del token
          //  console.log('Datos del token JWT:', decodedToken);
          } catch (error) {
            console.error('Error al decodificar el token:', error);
            // Ocurrió un error al decodificar el token, puedes manejar esta situación según tus necesidades
          }
    } else {
        rout.navigate(['login'])
        console.log("no hay nigun token de verificación")
    }
}