import { Component, OnInit, Inject } from '@angular/core';
import { AnimalType } from 'src/app/Models/AnimalType';
import { Breed } from 'src/app/Models/Breed';
import { City } from 'src/app/Models/City';
import { gender } from 'src/app/Models/Gender';
import { Publication } from 'src/app/Models/publication';
import { ApiAnimalTypeService } from 'src/app/Services/api-animalType.services';
import { ApiBreedService } from 'src/app/Services/api-breed.service';
import { ApiCityService } from 'src/app/Services/api-city.services';
import { ApiGenderService } from 'src/app/Services/api-gender.ervices.type';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { Image } from 'src/app/Models/Image';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css'],
  
})
export class AddPublicationComponent implements OnInit {
  title = "Añadir"
  
  constructor(private _apipublication: ApiPublicationService, private _ApiBreed: ApiBreedService,
    private _ApiAnimalType: ApiAnimalTypeService, private _ApiCity: ApiCityService,
    private _ApiGenderService: ApiGenderService,
    private tok : TokenService,
    private rout : Router,
  
    @Inject(MAT_DIALOG_DATA) public model: Publication
  ) { 
 
  }
  MessageErr = "";
  imgs: Array<string> = new Array<string>(5);
  numImg: number = 0;
  edit = false;
  i = 0;
  publication: Publication = {
    idGender: 0, idAnimalType: 0, idBreed: 0, idCity: 0, animalName: "", nameOwner: "", age: 0, weight: 0,
    typeName: "", breedName: "", cityName: "", description: "", idOwner: 1, idPublication: 0, images: [], price: 0
  };
  Breeds: Breed[] = [];
  Breeds1: Breed[] = [];
  Citys: City[] = [];
  AnimalTypes: AnimalType[] = [];
  Genders: gender[] = [];

  ngOnInit(): void {
    this.getAnimalTypes();
    this.getBreeds();
    this.getCitys();
    this.getGenders();
    if (this.model.idPublication != undefined) {
      this.title = "Update";
      console.log("entra")
      this.publication.idAnimalType = this.model.idAnimalType
      this.updateBreed(this.model.idAnimalType)
      this.publication.idBreed = this.model.idBreed
      this.publication.idGender = this.model.idGender
      this.publication.idCity = this.model.idCity
      this.publication.idOwner = this.model.idOwner
      this.publication.description = this.model.description
      this.publication.animalName = this.model.animalName
      this.publication.weight = this.model.weight
      this.publication.age = this.model.age
      this.publication.price = this.model.price
      this.publication.images = [];
      this.publication.images = this.model.images
      this.publication.images.forEach(x => {
        if (x.idImage as number == undefined)
        { x.number = this.i+1 } 
        else { x.number = (x.idImage as number); } 
        this.i = x.number;
      })
      this.addSpaceImg()
    } else {
      this.publication.images = [{ number: this.i }, { number: this.i + 1 }, { number: this.i + 2 }]
      this.i = this.i + 2;
    }

//console.log("el id es: ",this.tok.getId())
  }
  
  addEdit() {
    if (this.model.idPublication == undefined) {

     // console.log("agrega: " + this.publication.breedName)
      this.publication.idOwner =  this.tok.getIdUser();
      this.publication.idOwner = 3;
      console.log("agrega: " + this.publication.breedName)
      this._apipublication.AddPublications(this.publication).subscribe({
        next: (data) => {
          this.rout.navigate(['principal/PropertyList'])
        }, error: (e) => {
        }
      })
    } else {
      console.log("edita: " + this.model);
      this._apipublication.UpdatePublication(this.model.idPublication, this.publication).subscribe({
        next: (data) => {
          console.log("guarda: " + data);
        }, error: (e) => { }
      })
    }
  }
  getImage(event: any, num: number) {
    this.i++;
    this.numImg = num;
    this.imgToBase64(event.target.files[0]);
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
  toBase64(e: any) {
    let image = this.findImage(this.numImg);
    if (this.publication.images)
      image.dataImage = (btoa(e.target.result));
    if ((this.numImg == this.i)) {
      this.addSpaceImg();
    }

  }
  addSpaceImg() {
    if (this.findImage(this.i).dataImage) {
      this.i++;
      this.publication.images.push({ number: this.i });
    }
  }
  deleteSpace(number:number){
    let images1: Image[] =[];
    this.publication.images.forEach(x=>{
      if(this.publication.images.length <= 3 && number == x.number)
       { 
        x.dataImage=undefined;
        images1.push(x);
      }else if(this.publication.images.length <= 3 && number != x.number){
        images1.push(x);
      }
      
      else if (this.publication.images.length > 3 && number != x.number){
        images1.push(x);
      }
    })
    this.publication.images = images1;
  }
  findImage(number: number): Image {
    let image!: Image;
    this.publication.images.forEach(x => {
      if (x.number == number) { image = x; }
    });
    return image;
  }
  getBreeds() {
    this._ApiBreed.getAnimalType().subscribe(r => { this.Breeds = r; })
  }
  getCitys() {
    this._ApiCity.getAnimalType().subscribe(r => this.Citys = r)
  }
  getAnimalTypes() {
    this._ApiAnimalType.getAnimalType().subscribe(r => this.AnimalTypes = r)
  }
  getGenders() {
    this._ApiGenderService.getGenders().subscribe(r => this.Genders = r)
  }
  updateBreed(n: number) {

    this.Breeds1 = [];
    for (let breed of this.Breeds) {
      if (breed.idAnimalType == n)
        this.Breeds1.push(breed);
    }
  }
}


