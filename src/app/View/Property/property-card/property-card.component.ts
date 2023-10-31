import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Publication } from 'src/app/Models/publication';
import { ImgeDialogComponent } from '../imge-dialog/imge-dialog.component';
import { AddPublicationComponent } from '../add-publication/add-publication.component';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { PaypalComponent } from '../paypal/paypal.component';
import { MessageService } from 'src/app/Services/messageAlert.service';
import { TranslatService } from 'src/app/Services/Translate.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { ApiUserService } from 'src/app/Services/api-user.service';
@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],

})
export class PropertyCardComponent implements OnInit, AfterViewInit {
  date !: number;
  dat = false;
  price: any;
  @Input() propertyId!: number
  @Input() objeto: Publication = {
    nameOwner: "",
    animalName: "", age: 0, typeName: "", breedName: "", cityName: "", description: "",
    idOwner: 1, weight: 0, idPublication: 0, images: [], idGender: 0, idAnimalType: 0, idBreed: 0, idCity: 0, price: 0
  };
  constructor(
    private dialogMat: MatDialog,
    private _service: ApiPublicationService,
    private _message: MessageService,
    private trans: TranslatService,
    private trn: TranslateService,
    private rout: Router,
    private tok: TokenService,
    private user: ApiUserService
  ) {

  }
  ngOnInit(): void {
    if (this.propertyId > 0) {
      this.dat = true;
    }
    this.user.getUser(this.tok.getIdUser()).subscribe({
      next: (data) => {
        if (data == 1) {
          this.dat = true;
         }
      }
    })
    this.price = this.objeto.price
  }
  ngAfterViewInit(): void {
    this.trn.onLangChange.subscribe((event) => {
      this.objeto.price = this.trans.translatePrice(this.price)
    })
  }
  deletePublication(obj: Publication) {
    if (this.dat) {
      this._service.DeletePublication(obj.idPublication).subscribe({
        next: (data) => {
          console.log("Eliminado")
          this._message.messageAlert('La publicación del animal' + obj.animalName, ' ¡Fue eliminada!')
          this.rout.navigate(['principal/PropertyList'])
        }, error: (e) => {

        }
      })
    }
  }
  dateD(dat: any) {
    console.log("el dato es: " + dat);
  }
  openDialog(date: Publication) {
    this.dialogMat.open(ImgeDialogComponent, {

      disableClose: true,
      width: "80%",
      height: "80%",
      data: date

    }).afterClosed().subscribe(result => { })
  }
  openAdd(obj: Publication) {
    this.dialogMat.open(AddPublicationComponent, {
      width: "50%",
      height: "70vh",
      data: obj

    }).afterClosed().subscribe(result => {

    })
  }
  buy(obj: Publication) {
    this.dialogMat.open(PaypalComponent, {


      data: obj,
      panelClass: 'dialog-custom-style'

    }).afterClosed().subscribe(result => { })
  }

}

