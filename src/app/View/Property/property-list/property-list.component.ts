import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/Models/publication';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPublicationComponent } from '../add-publication/add-publication.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  position: number = 0;
  objetos:Array<Publication>=[]; 
  id : number = 0 ;
  datos = false;
  constructor(private api:ApiPublicationService,
    private rout : ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
    ){
    
  }
  ngOnInit(): void {
   const parseo = this.rout.snapshot.paramMap.get('id');
   if(parseo != null)  this.id = parseInt(parseo,10);
  
   if (!isNaN(this.id)) {
    if(this.id > 0){
      this.datos = true
     this.getUserPublications(this.id);
     }else{
  
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
  openDialog(){
    this.dialog.open(AddPublicationComponent,{
      width: "50%",
      height: "70vh",
     
        }).afterClosed()
  }
}
