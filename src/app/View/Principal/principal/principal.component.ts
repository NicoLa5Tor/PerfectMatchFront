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
  hrefActual=document.location.href.substring(document.location.origin.length,document.location.href.length);
  notificationObj:HTMLElement[]=[];
    links = [
      {  id:1,isActive: false, text: 'Perfil', href: `/principal/Profile/${this.getIdUser()}`,icon: 'bi bi-person'},
      {  id:2,isActive: false, text: 'Lista', href: '/principal/PropertyList' ,icon: 'bi bi-list'},
      {  id:3,isActive: false, text: 'Añadir', href: '/principal/Form',icon: 'bi bi-plus' },
      {  id:4, isActive: false, text: ' Mapa', href: '/principal/Map',icon: 'fas fa-map-marker-alt' },

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
  let href:string='/principal/PropertyList';
  this.rout.navigate([href]);
  this.Routerl(href);
}
Routerl(href:string)
{
  this.hrefActual=href;
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
showNotifications(){
  if(!this.notificationObj[0])
  {
    this.documentLoad();
  }
}
showFilters(){
  console.log(this.notificationObj)
  if(!this.notificationObj[1])
  {
    console.log(this.notificationObj)
    this.filterLoad();
  }
}

filterLoad(){
  
  const button_filters = document.querySelector(".button_filters") as HTMLButtonElement;
  const collapseSection = document.getElementById("collapseSection") as HTMLElement;
  this.notificationObj[1]=collapseSection;
  button_filters.addEventListener("click", () => {
    collapseSection.style.display = collapseSection.style.display!="block"?"block":"none"; // Mostrar el objeto
    collapseSection.focus(); // Asignar el foco al objeto
  });
  if(collapseSection)
  collapseSection.style.display = "block";

}
documentLoad():void {

    const notificationObj = document.getElementById("notificationObj") as HTMLElement;
    const buttonShow = document.querySelector(".buttonshow") as HTMLLabelElement;
    this.notificationObj[0]=notificationObj;
    buttonShow.addEventListener("click", () => {
      notificationObj.style.display = notificationObj.style.display=="block"?"none":"block"; // Mostrar el objeto
      notificationObj.focus(); // Asignar el foco al objeto
    });
  
    if(notificationObj)
    notificationObj.style.display = "block";
  }

}

