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
import { UserNormal } from './Guards/GuardUserNormal';


const routes: Routes = [
{path: "logIndex/:token", component: AppComponent},
{path:"login", component: LoginComponent},
{path: "register", component: RegisterComponent},
{path:"principal",component:PrincipalComponent, canActivate: [UserNormal],children: [
  {path: "PropertyList",component:PropertyListComponent,canActivate: [UserNormal]},
  {path: "Profile/:id",component:PropertyListComponent,canActivate: [UserNormal]},
  {path:"Form",component:AddPublicationComponent,canActivate: [UserNormal]},
  {path:"dialogImage",component: ImgeDialogComponent,canActivate: [UserNormal]},
  {path:"card",component: PropertyCardComponent,canActivate: [UserNormal]},
  {path:"pay",component:PaypalComponent,canActivate: [UserNormal]},
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
