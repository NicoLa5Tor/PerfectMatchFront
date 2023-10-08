import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const UserNormal = () => {
    const rout = inject(Router);
    if(localStorage.getItem('token_user')){
        console.log("sigues logeado")
     return true
    }else{
        console.log('No tienes acceso');
        rout.navigate(['login']);
        return false
    }
}