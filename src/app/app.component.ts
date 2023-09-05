import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
pagPrincipal: boolean = true;


prinPag(){
  this.pagPrincipal = true;
}
otherPag(){
this.pagPrincipal = false;
}
}
