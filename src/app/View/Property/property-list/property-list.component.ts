import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/Models/publication';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  objetos:Array<Publication>=[]; 
  constructor(private api:ApiPublicationService){
    
  }
  ngOnInit(): void {
    this.getPublications();
  }
  getPublications()
  {
    this.api.getPublications().subscribe(response=>{this.objetos=response} );
  }
}
