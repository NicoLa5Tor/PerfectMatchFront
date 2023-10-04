import { Component,HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  imgUrl : SafeResourceUrl;
  logoUrl: SafeResourceUrl;
  mostrarDiv = false;
  id : number = 2;
  hrefActual = "";
    links = [
      { isActive: false, text: 'Perfil', href: '/Profile/2' ,icon: 'bi bi-person'},
      { isActive: false, text: 'Lista', href: '/PropertyList' ,icon: 'bi bi-list'},
      { isActive: false, text: 'Añadir', href: '/Form',icon: 'bi bi-plus' },
      {isActive: false, text: 'Reportes', href: '/Report',icon: 'bi bi-archive' },
      
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
  
}
Routerl(href:string)
{
  this.hrefActual=href;
 // this.rout.navigateByUrl(href);
}

}


