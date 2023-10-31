
import {inject} from '@angular/core'
import { TokenService } from '../Services/token.service'
import { ApiUserService } from '../Services/api-user.service';
export const GuardPrincipal = () => {
const tok = inject(TokenService);
const user = inject(ApiUserService);
user.getUser(tok.getIdUser()).subscribe({
    next:(data) => {
        if(data == 1){
             console.log("retorna false")
           return false;
        }else{
            console.log("Retorna true")
            return true;
        }
    }
})
}