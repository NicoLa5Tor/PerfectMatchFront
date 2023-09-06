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
    animalName:"Pedro",
    description:"No hay description",
    Images:[]
  };
}
