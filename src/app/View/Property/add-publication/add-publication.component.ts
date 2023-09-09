import { Component, OnInit } from '@angular/core';
import { AnimalType } from 'src/app/Models/AnimalType';
import { Breed } from 'src/app/Models/Breed';
import { City } from 'src/app/Models/City';
import { gender } from 'src/app/Models/Gender';
import { Image } from 'src/app/Models/Image';
import { Publication } from 'src/app/Models/publication';
import { ApiAnimalTypeService } from 'src/app/Services/api-animalType.services';
import { ApiBreedService } from 'src/app/Services/api-breed.service';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { ApiGenderService } from 'src/app/Services/api-gender.ervices.type';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {
  constructor(private _apipublication:ApiPublicationService,private _ApiBreed:ApiBreedService,
    private _ApiAnimalType:ApiAnimalTypeService, private _ApiCity:ApiCityService,
    private _ApiGenderService:ApiGenderService) {}
  MessageErr="";
   imgs:Array<string>=new Array<string>(5);
   numImg:number=0;
   publication:Publication={idGender:0, idAnimalType:0, idBreed:0, idCity:0, animalName:"", nameOwner:"",
   typeName:"", breedName:"", cityName:"", description:"",idOwner:1,idPublication:0,images: []};
   Breeds:Breed[]=[];
   Breeds1:Breed[]=[];
   Citys:City[]=[];
   AnimalTypes:AnimalType[]=[];
   Genders:gender[]=[];

    ngOnInit(): void {
      this.getAnimalTypes();
      this.getBreeds();
      this.getCitys();
      this.getGenders();
    }
  saveData()
  {
      console.log(this.publication);
    if(this.publication.animalName == "" )
    {
      
      console.log("1");
      this.MessageErr = "animalname";
      return;
    }
    if( this.publication.images.length == 0 )
    {
    
      console.log("2");
      this.MessageErr = "Images";
      return;
    }
      if( this.publication.age == undefined || this.publication.age <1)
      {
        console.log("3");
        this.MessageErr = "Age debe ser un entero positivo";
        return;

      }
      if(this.publication.idAnimalType == 0 )
      {
        console.log("4");
      this.MessageErr = "type";
      return;
      }
      if( this.publication.idBreed == 0 )
      {

        console.log("5");
        this.MessageErr = "breed";
        return;
      } 
      if(this.publication.idCity == 0 )
      {
        console.log("6");
        this.MessageErr = "City";
        return;
      }
      if(this.publication.description === "")
      {
        console.log("7");
        this.MessageErr = "description";
        return;
      }  
      if( this.publication.idGender != undefined)
      {

        console.log("8");
        this.MessageErr = "sex";
        return;
      }
    if( this.publication.weight == undefined)
    {
      console.log("9");
      this.MessageErr = "weight";
      return;
    }
    
    console.log(this.publication);
    console.log("n");
    this._apipublication.AddPublications(this.publication).subscribe(r=>console.log(r));
    ;
  }
  
  getImage(event:any,num :number)
  {
    console.log(event)
    this.numImg=num;
    this.imgToBase64(event.target.files[0]);
    console.log(this.publication.images);
  }
  private imgToBase64(file: Blob) {
    if (file) {
      const reader = new FileReader();
      
      reader.onload = this.toBase64.bind(this);
      
      reader.readAsBinaryString(file);
      return file;
    }
    return null;
  }
  toBase64(e : any) {
    if(this.publication.images[this.numImg] != undefined)
    {
      this.publication.images[this.numImg].dataImage = ( btoa(e.target.result));
    }else{
      this.publication.images[this.numImg] = {dataImage:( btoa(e.target.result)),idImage:0,idPublication:0}
    }
    
  }
  getBreeds(){
    this._ApiBreed.getAnimalType().subscribe(r=>{this.Breeds=r;console.log(this.Breeds);})
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
  

  updateBreed(){
    this.Breeds1=[];
    for(let breed of this.Breeds)
    {
      if(breed.idAnimalType==this.publication.idAnimalType)
      this.Breeds1.push(breed);
    }
    
  }
}

