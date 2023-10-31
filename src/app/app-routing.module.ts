import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPublicationComponent } from './View/Property/add-publication/add-publication.component';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';
import { ImgeDialogComponent } from './View/Property/imge-dialog/imge-dialog.component';
import { PropertyCardComponent } from './View/Property/property-card/property-card.component';
import { PaypalComponent } from './View/Property/paypal/paypal.component';
import { LoginComponent } from './View/Access/login/login.component';
import { RegisterComponent } from './View/Access/register/register.component';
import { PrincipalComponent } from './View/Principal/principal/principal.component';
import { ValidateToken } from './Guards/VerifyTokenValidate';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';
import { ReLoginComponent } from './View/re-login/re-login.component';
import { Relogin } from './Guards/ReloginGuard';
import { MapComponent } from './View/Map/map.component';
import { ErrorComponent } from './View/Property/error/error.component';
import { NewPassComponent } from './View/Access/new-pass/new-pass.component';
import { GenerateTokenComponent } from './View/Access/recover-pass/recover-pass.component';


const routes: Routes = [
  { path: "logIndex/:token", component: AppComponent},
  { path: "login", component: LoginComponent, },
  { path: "register", component: RegisterComponent },
  {path: "Relogin",component:ReLoginComponent , canActivate: [Relogin]},
  {path:"forgot", component: GenerateTokenComponent},
  {path:"newpassword", component: NewPassComponent},
  {
    path: "principal", component: PrincipalComponent, canActivate: [ValidateToken], children: [
      {
        path: "PropertyList", component: PropertyListComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "Map", component: MapComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "Error", component: ErrorComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "Profile/:id", component: PropertyListComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "Form", component: AddPublicationComponent, canActivate: [ValidateToken]
        , data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "dialogImage", component: ImgeDialogComponent, canActivate: [ValidateToken], canActivateChild : [],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "card", component: PropertyCardComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
      {
        path: "pay", component: PaypalComponent, canActivate: [ValidateToken],
        data: {
          authInterceptor: AuthInterceptor
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
