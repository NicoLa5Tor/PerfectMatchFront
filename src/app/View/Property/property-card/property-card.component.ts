import { Component, Input } from '@angular/core';
import { Publication } from 'src/app/Models/publication';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {

  constructor() {
  }
  printObject(){
    console.log(this.objeto);
  }
  @Input() objeto:Publication={nameOwner:"",
    animalName:"", age:0, typeName:"", breedName:"", cityName:"", description:"",
  idOwner:1, weight:0, idPublication:0, images: [],idGender:0, idAnimalType:0, idBreed:0, idCity:0 };
  
}
