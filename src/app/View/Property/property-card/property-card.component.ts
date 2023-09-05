import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() card: any
 objeto={
  "Name": "Pedro",
  "Price": 12000
 }
}
