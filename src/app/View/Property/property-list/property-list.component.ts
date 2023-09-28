import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/Models/publication';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPublicationComponent } from '../add-publication/add-publication.component';
import { Router } from '@angular/router';
import { Filter } from 'src/app/Models/Filter';
import { Breed } from 'src/app/Models/Breed';
import { City } from 'src/app/Models/City';
import { AnimalType } from 'src/app/Models/AnimalType';
import { gender } from 'src/app/Models/Gender';
import { Client } from 'src/app/Models/Client';
import { ApiBreedService } from 'src/app/Services/api-breed.service';
import { ApiAnimalTypeService } from 'src/app/Services/api-animalType.services';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { ApiClientService } from 'src/app/Services/api-client.services';
import { ApiGenderService } from 'src/app/Services/api-gender.ervices.type';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  
  publications:Publication[]=[];
  publications1:Publication[]=[];

  filter:Filter={ageF:20,ageI:0,idAnimalType:0,idBreed:0,idCity:0,idGender:0,weightF:700,weightI:0,idOwner:0};

  Breeds:Breed[]=[];
  Breeds1:Breed[]=[];
  Citys:City[]=[];
  AnimalTypes:AnimalType[]=[];
  Genders:gender[]=[];
  Sellers:Client[]=[];


  position: number = 0;
  id : number = 0 ;



  constructor(private api:ApiPublicationService,
    private rout : ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,private _ApiBreed:ApiBreedService,
    private _ApiAnimalType:ApiAnimalTypeService, private _ApiCity:ApiCityService,
    private _ApiGenderService:ApiGenderService,private _ApiClient:ApiClientService
    ){
    
  }
  ngOnInit(): void {
   const parseo = this.rout.snapshot.paramMap.get('id');
   if(parseo != null)  this.id = parseInt(parseo,10);
  
   if (!isNaN(this.id)) {
    if(this.id > 0){
     this.getUserPublications(this.id);
     }else{
      this.getPublications();
     }
    }
    this.getAnimalTypes();
    this.getBreeds();
    this.getCitys();
    this.getGenders();
    this.getSellers();
  }

  getPublications()
  {
    this.api.getPublications().subscribe(response=>{this.publications=response;
      this.publications1=response;} );
  }
  getUserPublications(id : number)
  {
    this.api.UserPublications(id).subscribe(x=>
      {this.publications = x;
        this.publications1=x;
      }
    )
  }
    getBreeds(){
      this._ApiBreed.getAnimalType().subscribe(r=>{this.Breeds=r;})
    }
    getCitys(){
      this._ApiCity.getAnimalType().subscribe(r=>this.Citys=r)
    }
    getAnimalTypes(){
      this._ApiAnimalType.getAnimalType().subscribe(r=>this.AnimalTypes=r)
    }
    getGenders(){
      this._ApiGenderService.getGenders().subscribe(r=>this.Genders=r)
    }
    getSellers(){
      this._ApiClient.getSellers().subscribe(r=>{this.Sellers=r})
    }
    
  updateBreed(){
    this.Breeds1=[];
    for(let breed of this.Breeds)
    {
      if(breed.idAnimalType==this.filter.idAnimalType)
      this.Breeds1.push(breed);
    }
    this.filter.idBreed=0;
  }
  updatePF(){
    this.publications1 = [];
    this.publications.forEach(element => {
      if(
      (element.idCity == this.filter.idCity || this.filter.idCity == 0 )&&
      (element.idOwner == this.filter.idOwner || this.filter.idOwner == 0)&&
      (element.weight>this.filter.weightI-1)&&
      (element.weight<this.filter.weightF+1||this.filter.weightF==0||(typeof(this.filter.weightF)!="number"))&&
      (element.idGender==this.filter.idGender||this.filter.idGender==0)&&
      (element.age>this.filter.ageI-1)&&
      (element.age<this.filter.ageF+1||this.filter.ageF==0||(typeof(this.filter.ageF)!="number"))&&
      (element.idAnimalType==this.filter.idAnimalType||this.filter.idAnimalType==0)&&
      (element.idBreed==this.filter.idBreed||this.filter.idBreed==0)
      )
      this.publications1.push(element);
    });
  }

}
