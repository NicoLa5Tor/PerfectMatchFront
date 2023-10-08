import { Component,HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { PropertyListComponent } from '../../Property/property-list/property-list.component';
import jwtDecode, { JwtPayload } from 'jwt-decode';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  imgUrl : SafeResourceUrl;
  idUser : number  = 0;
  logoUrl: SafeResourceUrl;
  mostrarDiv = false;
  id : number = 2;
  hrefActual = "";
    links = [
      { isActive: false, text: 'Perfil', href: `/principal/Profile/${this.getIdUser()}`,icon: 'bi bi-person'},
      { isActive: false, text: 'Lista', href: '/principal/PropertyList' ,icon: 'bi bi-list'},
      { isActive: false, text: 'Añadir', href: '/principal/Form',icon: 'bi bi-plus' },

    ];
    constructor(private rout: Router,
    
   private sanitizer: DomSanitizer

      ) {
      const log = 'assets/logo-p.png'
      const img = 'assets/logo.png';
      this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(img);
      this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(log);
 
    }
ngOnInit(): void {
  this.rout.navigate(['principal/PropertyList'])
}
Routerl(href:string)
{
  this.hrefActual=href;
 // this.rout.navigateByUrl(href);
}
onClickLogout(){
  localStorage.removeItem('token_user');
  this.rout.navigate(['login'])
}
getIdUser(): number{
   
  const token = localStorage.getItem('token_user');
  if(token){
  const decodeToken : JwtPayload  = jwtDecode(token);
   return (decodeToken as any).nameid;
  
}
return 0
}
}

