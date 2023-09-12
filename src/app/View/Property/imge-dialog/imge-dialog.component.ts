import { Component, Inject,Input,OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publication } from 'src/app/Models/publication';

@Component({
  selector: 'app-imge-dialog',
  templateUrl: './imge-dialog.component.html',
  styleUrls: ['./imge-dialog.component.css']
})
export class ImgeDialogComponent implements OnInit{

constructor(
  private fb: FormBuilder,
  @Inject (MAT_DIALOG_DATA) public data: Publication
) {
}@Input() model: Publication = 
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
   images: [],
   idGender:this.data.idGender,
   idAnimalType:this.data.idAnimalType,  
   idBreed:this.data.idBreed,
   idCity:this.data.idCity}
 
ngOnInit(): void {
if(this.data){


}
}
}
