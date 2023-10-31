import { Component } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { RefreshToken } from 'src/app/Models/RefreshTok';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-re-login',
  templateUrl: './re-login.component.html',
  styleUrls: ['./re-login.component.css']
})
export class ReLoginComponent {

constructor(private  tok : TokenService , private rout : Router, private recov : LoginService , private trans : TranslateService) {
  
}
cancel(){
  this.tok.deleteCookie("Token");
  this.tok.deleteCookie("Refresh");
  this.rout.navigate(["login"])
}
 acept(){
 const refresh : RefreshToken = {
  refreshToken : this.tok.getTok("Refresh") || "",
  
  tokenExpire : this.tok.getTok("Token") || ""
 }
 console.log("El refresh es: ",refresh.refreshToken);
this.recov.RefreshToken(refresh).subscribe({
next:(data) => 
{
  this.tok.deleteCookie("Refresh")
  this.tok.deleteCookie("Token")
  if(data.result){
  this.tok.setToken(data.token,"Token");
  this.tok.setToken(data.refreshToken,"Refresh")
  this.rout.navigate(["principal"])
  }else{
 this.rout.navigate(["login"])
  }
}
})
}
}
