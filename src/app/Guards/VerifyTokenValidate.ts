import { Inject, inject } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { TokenService } from "../Services/token.service";
import { RefreshToken } from "../Models/RefreshTok";
import { LoginService } from "../Services/login.service";
import { ApiUserService } from "../Services/api-user.service";
export const ValidateToken = () => {
  let refresh: RefreshToken;

  const user = inject(ApiUserService)
  const tokService = inject(LoginService)
  const rout = inject(Router);
  const tok = inject(TokenService)
  const jwtTok = tok.getTok("Token") || "";

  const currentTimestamp = Math.floor(Date.now() / 1000);
  // console.log("EL token es:" + jwtTok)




  if (jwtTok != null && jwtTok != "") {
    try {
      // Decodifica el token JWT
      const decodedToken: JwtPayload = jwtDecode(jwtTok);
      user.getUser(tok.getIdUser()).subscribe({
        next:(data) => {
          if(data == 1){
            rout.navigate(['principalAdmin'])
          }
        }
      })

      if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
        console.log('El token JWT está vigente.');

        // El token está vigente, puedes permitir el acceso a recursos protegidos.
      } else {
        console.log('El token JWT ha caducado.');
        rout.navigate(["Relogin"])
      }

    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  } else {
    rout.navigate(['login'])
    console.log("no hay nigun token de verificación")
  }
}

