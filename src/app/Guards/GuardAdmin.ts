
import {inject} from '@angular/core'
import { TokenService } from '../Services/token.service'
import { ApiUserService } from '../Services/api-user.service';
import { Router } from '@angular/router';
export const GuardAdmin = () => {
const tok = inject(TokenService);
const user = inject(ApiUserService);
const rout = inject(Router)
user.getUser(tok.getIdUser()).subscribe({
    next:(data) => {
        if(data == 1){
            
             console.log("retorna true")
           return true;
        }else{
            rout.navigate(['principal'])
            console.log("Retorna falso")
            return false;
        }
    }
})
}