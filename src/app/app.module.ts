import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './View/navbar/navbar.component';
import { PropertyCardComponent } from './View/Property/property-card/property-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {HttpClientModule} from '@angular/common/http'; 

import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

 //Esto es para trabajar con formularios

 import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 
import {MatTableModule} from '@angular/material/table'; 



//esto es para trabajar con alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';
//para trabajar los iconos de material
import {MatIconModule} from '@angular/material/icon'; 
//para trabajar con modales de material
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
//para trabajar con las cuadriculas
import {MatGridListModule} from '@angular/material/grid-list';

//para el dialogo
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyListComponent } from './View/Property/property-list/property-list.component';
import { AddPublicationComponent } from './View/Property/add-publication/add-publication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyCardComponent,
    PropertyListComponent,
    AddPublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    HttpClientModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule, 
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
