import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/Models/publication';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
 
  objetos:Array<Publication>=[]; 
  id : number = 0 ;
  list! : boolean;
  datos = false;
  constructor(private api:ApiPublicationService,
    private rout : ActivatedRoute
    ){
    
  }
  ngOnInit(): void {
   const parseo = this.rout.snapshot.paramMap.get('id');
   if(parseo != null)  this.id = parseInt(parseo,10);
  
   if (!isNaN(this.id)) {
    if(this.id > 0){
      console.log("entra");
      this.datos = true;
     this.getUserPublications(this.id);
     }else{
      console.log("sale")
      this.getPublications();
     }
  } else {
    
  }
  }
  getPublications()
  {
    this.api.getPublications().subscribe(response=>{this.objetos=response} );
  }
  getUserPublications(id : number)
  {
    this.api.UserPublications(id).subscribe(
      {
        next:(data)=>{
           this.objetos = data;
          
           
        },error:(e) => 
        {

        }
      }
    )
  }
}
