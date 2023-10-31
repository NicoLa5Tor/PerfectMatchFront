import { Inject, inject } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { TokenService } from "../Services/token.service";
import { RefreshToken } from "../Models/RefreshTok";
import { LoginService } from "../Services/login.service";
export const ValidateToken = () => {
    let refresh : RefreshToken ;

   
    const tokService = inject(LoginService)
    const rout = inject(Router);
    const tok = inject(TokenService)
    const jwtTok = tok.getTok("Token") || "";
    
    const currentTimestamp = Math.floor(Date.now() / 1000); 
   console.log("EL token es:" + jwtTok)
    if (jwtTok != null && jwtTok != "" ) {
        try {
            // Decodifica el token JWT
            const decodedToken : JwtPayload = jwtDecode(jwtTok);
               const id = decodedToken.sub;
           const userId = (decodedToken as any).nameid;
            console.log('ID del usuario:', userId);
       if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
        console.log('El token JWT está vigente.');

        // El token está vigente, puedes permitir el acceso a recursos protegidos.
      } else {
        console.log('El token JWT ha caducado.');
        rout.navigate(["Relogin"])
   /*     refresh = {
          tokenExpire : tok.getTok("Token") || "",
          refreshToken : tok.getTok("Refresh") || ""
        }
       tokService.RefreshToken(refresh).subscribe({
        next:(data) => {
          if(data.result){
          tok.deleteCookie("Token")
          tok.deleteCookie("Refresh")
           tok.setToken(data.token, "Token");
           tok.setToken(data.refreshToken, "Refresh")
          }else{
            tok.deleteCookie("Token")
            tok.deleteCookie("Refresh")
          }*/
        }
       
         
        
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
    } else {
        rout.navigate(['login'])
        console.log("no hay nigun token de verificación")
    }
  
}