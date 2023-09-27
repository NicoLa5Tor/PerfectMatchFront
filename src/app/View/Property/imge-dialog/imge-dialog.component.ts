import { Component, Inject,Input,OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publication } from 'src/app/Models/publication';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { LinkDialogComponent } from '../LowDialog/link-dialog/link-dialog.component';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';


@Component({
  selector: 'app-imge-dialog',
  templateUrl: './imge-dialog.component.html',
  styleUrls: ['./imge-dialog.component.css']
})
export class ImgeDialogComponent implements OnInit{
i : number  = 0;
constructor(
  private _bottomSheet: MatBottomSheet,
  private api : ApiPublicationService,
  @Inject (MAT_DIALOG_DATA) public data: Publication
) {
}

@Input() model: Publication = 
  {
    
   nameOwner: this.data.nameOwner,
   animalName: this.data.animalName, 
   age:this.data.age,
   typeName:this.data.typeName,
   breedName:this.data.breedName, 
   cityName:this.data.cityName, 
   description:this.data.description,
   idOwner:this.data.idOwner, 
   weight:this.data.weight,
   idPublication:this.data.idPublication,
   images: this.data.images,
   idGender:this.data.idGender,
   idAnimalType:this.data.idAnimalType,  
   idBreed:this.data.idBreed,
   idCity:this.data.idCity
  }
 
ngOnInit(): void {
  console.log("Consola: "+this.data)
}
plus(){
 
  if(this.model.images.length-1 > this.i){
    console.log(this.model.images.length)  
this.i ++;
  }
}

minus(){
  if(0 < this.i){
    this.i --;
  }


}
openBottomSheet(): void {
  this._bottomSheet.open(LinkDialogComponent,{
    
    data: this.model,
    disableClose: false
    
    
  });
}
}
