import { Component, Input } from '@angular/core';
import { Publication } from 'src/app/Models/publication';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {

  constructor() {
    console.log(this.objeto);
    
  }
  @Input() objeto:Publication={
    animalName:"", age:0, animalType:"", breed:"", city:"", description:"",
  owner:1, weight:0, idPublication:0, Images: [], sex:true, idAnimalType:0, idBreed:0, idCity:0 };
  
}
