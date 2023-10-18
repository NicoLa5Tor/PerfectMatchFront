import {inject} from '@angular/core'
import { TokenService } from '../Services/token.service'
export const Relogin = () => {
const tok = inject(TokenService);
const Refresh = tok.getTok("Refresh") || "";
if(Refresh != null && Refresh != "" ) {
    return true;
}else{
    
    return false;
}
}