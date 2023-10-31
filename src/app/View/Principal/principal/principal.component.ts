import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PropertyListComponent } from '../../Property/property-list/property-list.component';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { TokenService } from 'src/app/Services/token.service';
import { ApiUserService } from 'src/app/Services/api-user.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  imgUrl: SafeResourceUrl;
  idUser: number = 0;
  logoUrl: SafeResourceUrl;
  mostrarDiv = true;

  id!: number;
  hrefActual = "";
  links = [
    { isActive: false, text: 'Perfil', href: `/principal/Profile/${this.tok.getIdUser()}`, icon: 'bi bi-person' },
    { isActive: false, text: 'Lista', href: '/principal/PropertyList', icon: 'bi bi-list' },
    { isActive: false, text: 'Añadir', href: '/principal/Form', icon: 'bi bi-plus' },
    { isActive: false, text: 'Mapa', href: '/principal/Map', icon: 'fas fa-map-marker-alt' },
    { isActive: false, text: 'Reportes', href: '/principal/Report', icon: 'bi bi-book' }
  ];
  linksAux = [
    { isActive: false, text: 'Lista', href: '/principalAdmin/Profile', icon: 'bi bi-list' },
    { isActive: false, text: 'Mapa', href: '/principalAdmin/Map', icon: 'fas fa-map-marker-alt' },
  ];
  constructor(private rout: Router,
    private tok: TokenService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private userS: ApiUserService
  ) {
    const id = this.route.snapshot.params["id"];
    this.id = id;
    console.log("el id es: ", id)

    const log = 'assets/logo-p.png'
    const img = 'assets/logo.png';
    this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(img);
    this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(log);

  }
  ngOnInit(): void {
    this.userS.getUser(this.tok.getIdUser()).subscribe({
      next: (dat) => {

        if (dat > 1) {
          this.mostrarDiv = false;
          console.log("entra al normal ")
          this.rout.navigate(['principal/PropertyList'])
        } else {
          console.log("Este es admin")
          this.mostrarDiv = true;
          this.rout.navigate(['principalAdmin/Profile'])

        }
      }

    })
  }
  Routerl(href: string) {
    this.hrefActual = href;
    // this.rout.navigateByUrl(href);
  }
  onClickLogout() {
    this.tok.deleteCookie("Token")
    this.tok.deleteCookie("Refresh")
    this.rout.navigate(['login'])
  }

}

