
import {inject} from '@angular/core'
import { TokenService } from '../Services/token.service'
import { ApiUserService } from '../Services/api-user.service';
export const GuardAdmin = () => {
const tok = inject(TokenService);
const user = inject(ApiUserService);
user.getUser(tok.getIdUser()).subscribe({
    next:(data) => {
        if(data == 1){
             console.log("retorna true")
           return true;
        }else{
            console.log("Retorna falso")
            return false;
        }
    }
})
}