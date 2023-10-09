import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPublicationComponent } from './View/Property/add-publication/add-publication.component';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';
import { ImgeDialogComponent } from './View/Property/imge-dialog/imge-dialog.component';
import { PropertyCardComponent } from './View/Property/property-card/property-card.component';
import { PaypalComponent } from './View/Property/paypal/paypal.component';
import { ReportViewerComponent } from './View/report-viewer/report-viewer.component';
import { LoginComponent } from './View/Access/login/login.component';
import { RegisterComponent } from './View/Access/register/register.component';
import { PrincipalComponent } from './View/Principal/principal/principal.component';
import { UserNormal } from './Guards/GuardUserNormal';
import { ValidateToken } from './Guards/VerifyTokenValidate';


const routes: Routes = [
{path: "logIndex/:token", component: AppComponent},
{path:"login", component: LoginComponent},
{path: "register", component: RegisterComponent},
{path:"principal",component:PrincipalComponent, canActivate: [ValidateToken],children: [
  {path: "PropertyList",component:PropertyListComponent,canActivate: [ValidateToken]},
  {path: "Profile/:id",component:PropertyListComponent,canActivate: [ValidateToken]},
  {path:"Form",component:AddPublicationComponent,canActivate: [ValidateToken]},
  {path:"dialogImage",component: ImgeDialogComponent,canActivate: [ValidateToken]},
  {path:"card",component: PropertyCardComponent,canActivate: [ValidateToken]},
  {path:"pay",component:PaypalComponent,canActivate: [ValidateToken]},
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
