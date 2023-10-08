import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const ValidateToken = () => {
    const rout = inject(Router);
    const jwtTok = localStorage.getItem('token_user');
    if (jwtTok) {
        try {

            const currentTime = Math.floor(Date.now() / 1000);

        } catch (error) {

        }

    } else {
        rout.navigate(['login'])
        console.log("no hay nigun token de verificación")
    }
}