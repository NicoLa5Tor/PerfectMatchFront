import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPublicationComponent } from './View/Property/add-publication/add-publication.component';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';
import { ImgeDialogComponent } from './View/Property/imge-dialog/imge-dialog.component';
import { PropertyCardComponent } from './View/Property/property-card/property-card.component';
import { PaypalComponent } from './View/Property/paypal/paypal.component';

const routes: Routes = [
{path:"#",component: PropertyListComponent},
{path: "PropertyList",component:PropertyListComponent},
{path: "Profile/:id",component:PropertyListComponent},
{path:"Form",component:AddPublicationComponent},
{path:"dialogImage",component: ImgeDialogComponent},
{path:"card",component: PropertyCardComponent},
{path:"pay",component:PaypalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
