import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Publication } from 'src/app/Models/publication';
import { ImgeDialogComponent } from '../imge-dialog/imge-dialog.component';
import { AddPublicationComponent } from '../add-publication/add-publication.component';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  date !: number;
  dat = false;
  @Input() propertyId!:number
  @Input() objeto:Publication={nameOwner:"",
    animalName:"", age:0, typeName:"", breedName:"", cityName:"", description:"",
  idOwner:1, weight:0, idPublication:0, images: [],idGender:0, idAnimalType:0, idBreed:0, idCity:0 };
   constructor(
    private dialogMat: MatDialog,
  ) {
  
  }
  ngOnInit(): void {
    if(this.propertyId > 0){
      this.dat = true;
    }
  }
  dateD(dat: any){
    console.log("el dato es: "+dat);
  }
  openDialog(date: Publication){
    this.dialogMat.open(ImgeDialogComponent, {
      
      disableClose: true,
      width: "80%",
      height: "80%",

    } ).afterClosed().subscribe(result =>{})
  }
  openAdd(obj: Publication){
    this.dialogMat.open(AddPublicationComponent,{
      width: "50%",
      height: "70vh",
      data : obj
        }).afterClosed().subscribe(result => {

        })
  }
}

