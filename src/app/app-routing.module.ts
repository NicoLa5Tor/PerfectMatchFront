import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPublicationComponent } from './View/Property/add-publication/add-publication.component';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';
import { ImgeDialogComponent } from './View/Property/imge-dialog/imge-dialog.component';

const routes: Routes = [
{path:"#",component: AppComponent},
{path: "PropertyList",component:PropertyListComponent},
{path: "Profile/:id",component:PropertyListComponent},
{path:"Form",component:AddPublicationComponent},
{path:"dialogImage",component: ImgeDialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
