import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Publication } from 'src/app/Models/publication';
import { ImgeDialogComponent } from '../imge-dialog/imge-dialog.component';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  date !: number;
  constructor(
    private dialogMat: MatDialog
  ) {

  }
  printObject(){
    console.log(this.objeto);
  }
  @Input() objeto:Publication={nameOwner:"",
    animalName:"", age:0, typeName:"", breedName:"", cityName:"", description:"",
  idOwner:1, weight:0, idPublication:0, images: [],idGender:0, idAnimalType:0, idBreed:0, idCity:0 };
  dateD(dat: any){
    console.log("el dato es: "+dat);
  }
  openDialog(date: Publication){
    this.dialogMat.open(ImgeDialogComponent, {
      disableClose: true,
      width: "80%",
      height: "80%",
      data: date
    } ).afterClosed().subscribe(result => {
      
    })
  }
}
