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
import { ApiBreedService } from 'src/app/Services/api-breed.service';
import { ApiAnimalTypeService } from 'src/app/Services/api-animalType.services';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { ApiGenderService } from 'src/app/Services/api-gender.ervices.type';
import { ErrorCom } from 'src/app/Models/Error';
import { ErrorService } from 'src/app/Services/Error.Service';
import { ApiUserService } from 'src/app/Services/api-user.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  
  publications:Publication[]=[];
  publications1:Publication[]=[];

  filter:Filter={ageF:20,ageI:0,idAnimalType:0,idBreed:0,idCity:0,idGender:0,weightF:700,weightI:0,idOwner:0};
  query: string = "";
  Breeds:Breed[]=[];
  Breeds1:Breed[]=[];
  Citys:City[]=[];
  AnimalTypes:AnimalType[]=[];
  Genders:gender[]=[];
  Sellers:User[]=[];


  position: number = 0;
  id : number = 0 ;



  constructor(private api:ApiPublicationService,
    private rout : ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,private _ApiBreed:ApiBreedService,
    private _ApiAnimalType:ApiAnimalTypeService, private _ApiCity:ApiCityService,
    private _ApiGenderService:ApiGenderService,private _ApiClient:ApiUserService,
    private error : ErrorService
    ){
    
  }
  ngOnInit(): void {
   const parseo = this.rout.snapshot.paramMap.get('id');
   //console.log("id = ",parseo)
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
    this.api.UserPublications(id).subscribe(
      {
        next:(Data) => {       
            this.publications = Data
            this.publications1 = Data
            if(Data[0] == undefined){
              const error : ErrorCom = {
                title : 'Mensaje Informativo',
                header :'',
                boddy: 'No tienes publicaciones aún',
                textAux: ''
              }
              this.error.setComponent(error);
              this.router.navigate(['principal/Error']);
              }
          }
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
        (element.idCity == this.filter.idCity || this.filter.idCity == 0) &&
        (element.idOwner == this.filter.idOwner || this.filter.idOwner == 0) &&

        (element.weight > this.filter.weightI - 1) &&
        (element.weight < this.filter.weightF + 1 || this.filter.weightF == 0 || (typeof (this.filter.weightF) != "number")) &&
        (element.idGender == this.filter.idGender || this.filter.idGender == 0) &&
        (element.age > this.filter.ageI - 1) &&
        (element.age < this.filter.ageF + 1 || this.filter.ageF == 0 || (typeof (this.filter.ageF) != "number")) &&
        (element.idAnimalType == this.filter.idAnimalType || this.filter.idAnimalType == 0) &&
        (element.idBreed == this.filter.idBreed || this.filter.idBreed == 0))
      
      this.publications1.push(element);
      
    });
  
  }
  
  sortInvers() {
    this.publications1.reverse();
  }
  sortByCity() {
    let truste = true;
    while (truste) {
      truste = false;
      for (let i = 0; i < this.publications1.length - 1; i++) {
        if (this.publications1[i].cityName > this.publications1[i + 1].cityName) {
          let publi = this.publications1[i];
          this.publications1[i] = this.publications1[i + 1];
          this.publications1[i + 1] = publi;
          truste = true;
        }
      }
    }
  }
  sortByWeight() {
    let menor!: Publication;
    let position = 0;
    let menorPosi = 0;
    let truste = true;
    while (truste) {
      for (let i = position; i < this.publications1.length - 1; i++) {
        if (i == position) {
          menor = this.publications1[i];
          menorPosi = i;
        }
        if (menor.weight > this.publications1[i + 1].weight) {
          menor = this.publications1[i + 1];
          menorPosi = i + 1;
        }
      }
      if (menor != this.publications1[position]) {
        let publi1: Publication = menor;
        this.publications1[menorPosi] = this.publications1[position];
        this.publications1[position] = publi1;
      }
      position++;
      if (position === this.publications1.length - 1) { truste = false; }
    }
  }
  showpublic() { 

  }
  sortByAnimalName() {
    
    let actualObj!: Publication;
    for (let i = 1; i < this.publications1.length; i++) {
      if (this.publications1[i].animalName < this.publications1[i - 1].animalName) {
        for (let ni = i - 1; ni >= 0; ni--) {
          if ((this.publications1[ni].animalName <= this.publications1[i].animalName)||ni==0) {
            actualObj=this.publications1[i];
            let nivali = ni==0&&this.publications1[ni].animalName > this.publications1[i].animalName?ni:ni+1;
            for(let move = i-1;move>= ( nivali);move--)
            {
              this.publications1[move+1]=this.publications1[move];
            }
            this.publications1[nivali]=actualObj;
            break;
          }
        }
        
      }
    }
  }
  Query(){
    this.publications1 = [];
    this.publications.forEach(element => {
      if (
        ((element.cityName.toLowerCase()).search(this.query.toLowerCase())!=-1)||
        ((element.animalName.toLowerCase()).search(this.query.toLowerCase())!=-1)||
        ((element.breedName.toLowerCase()).search(this.query.toLowerCase())!=-1)||
        ((element.nameOwner.toLowerCase()).search(this.query.toLowerCase())!=-1)||
        (((element.genderName as string).toLowerCase()).search(this.query.toLowerCase())!=-1)||
        ((element.typeName.toLowerCase()).search(this.query.toLowerCase())!=-1))
        {
          this.publications1.push(element);
        }

    });
  }

}
