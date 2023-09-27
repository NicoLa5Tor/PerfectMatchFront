import { Component,HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  imgUrl : SafeResourceUrl
  mostrarDiv = false;
  id : number = 2;

    links = [
      { isActive: false, text: 'Inicio', href: '' },
      { isActive: false, text: 'Perfil', href: '/Profile/2' },
      { isActive: false, text: 'Lista', href: '/PropertyList' },
      { isActive: false, text: 'Añadir', href: '/Form' },

    ];
    constructor(private rout: Router,
    
   private sanitizer: DomSanitizer
      ) {
      const img = 'assets/logo.png';
      this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
ngOnInit(): void {
  
}


}


