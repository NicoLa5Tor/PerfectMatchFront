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

const routes: Routes = [
{path: "PropertyList",component:PropertyListComponent},
{path: "Profile/:id",component:PropertyListComponent},
{path:"Form",component:AddPublicationComponent},
{path:"dialogImage",component: ImgeDialogComponent},
{path:"card",component: PropertyCardComponent},
{path:"pay",component:PaypalComponent},
{path:"Report", component:ReportViewerComponent}
{path:"pay",component:PaypalComponent},
{path:"login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
