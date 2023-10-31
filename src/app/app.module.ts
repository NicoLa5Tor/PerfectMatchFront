import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './View/navbar/navbar.component';
import { PropertyCardComponent } from './View/Property/property-card/property-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; 

import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgeDialogComponent } from './View/Property/imge-dialog/imge-dialog.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { LinkDialogComponent } from './View/Property/LowDialog/link-dialog/link-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaypalComponent } from './View/Property/paypal/paypal.component';


import { NgxPayPalModule } from 'ngx-paypal';
import { ReportViewerComponent } from './View/report-viewer/report-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgChartsModule} from 'ng2-charts';
import { DatePipe } from '@angular/common';

import { LoginComponent } from './View/Access/login/login.component';
import { RegisterComponent } from './View/Access/register/register.component';
import { PrincipalComponent } from './View/Principal/principal/principal.component';
import { FooterComponent } from './View/footer/footer.component';
import { TokenService } from './Services/token.service';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';
import { ReLoginComponent } from './View/re-login/re-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyCardComponent,
    PropertyListComponent,
    AddPublicationComponent,
    ImgeDialogComponent,
    LinkDialogComponent,
    PaypalComponent,
    ReportViewerComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    FooterComponent,
    ReLoginComponent,
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    MatBottomSheetModule,
    NgFor,
    MatListModule,
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
    FormsModule,
    NgbModule,
    FormsModule,
    PdfViewerModule,
    NgChartsModule,
  ],

  providers: [
  {provide:MAT_DIALOG_DATA,useValue:{}
  },
  {provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,},
  {provide: TokenService}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
