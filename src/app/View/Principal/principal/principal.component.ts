import { Component,HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { PropertyListComponent } from '../../Property/property-list/property-list.component';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { TokenService } from 'src/app/Services/token.service';

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
      { isActive: false, text: ' Mapa', href: '/principal/Map',icon: 'fas fa-map-marker-alt' },

      { isActive: false, text: 'Reportes', href: '/principal/Report',icon: 'bi bi-book' }
    ];
    constructor(private rout: Router,
    private tok : TokenService,
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
 this.tok.deleteCookie("Token")
 this.tok.deleteCookie("Refresh")
  this.rout.navigate(['login'])
}
getIdUser(): number{
   
  const token = this.tok.getTok("Token");
  if(token){
  const decodeToken : JwtPayload  = jwtDecode(token);
   return (decodeToken as any).nameid;
  
}
return 0
}
}

