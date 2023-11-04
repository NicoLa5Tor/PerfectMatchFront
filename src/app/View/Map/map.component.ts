import { Component,  AfterViewInit, OnInit } from '@angular/core';
import { GeoNamesService } from 'src/app/Services/geonames.service';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { from } from 'rxjs';
import { Publication } from 'src/app/Models/publication';
import {  map } from 'rxjs/operators';
import { concatMap, delay } from 'rxjs/operators';
import { MapService } from 'src/app/Services/map.services';
import { Location } from 'src/app/Models/Location';
import { da } from 'date-fns/locale';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorService } from 'src/app/Services/Error.Service';
import { ErrorCom } from 'src/app/Models/Error';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],

})
export class MapComponent implements AfterViewInit, OnInit {

//
  isError = false;
  isloading = true;
  date: any;
  listAnimals: Publication[] = [];
  maping : Location [] = []

  constructor(private geoN: GeoNamesService,
    private listA: ApiPublicationService,
    private map_Service : MapService,
    private error_Service : ErrorService
     ) {
    //Pone todos los puntos en el mapa
   this.listA.getPublications().subscribe({
    next:(data) => {
      this.listAnimals = data;
     from(this.listAnimals).pipe(
      concatMap((element) => this.geoN.getCoordinates(element.cityName,'Colombia').pipe(

        map((dat) => (
          {name : element.animalName, latit :dat[0].lat, long : dat[0].lon}))
      ))
     ).subscribe({
      next:(data) => {
        const aux = {Name: data.name , latitud : data.latit, longitud : data.long}
       this.maping.push(aux)
       const lastIndex = this.listAnimals.length - 1;
       if(this.maping.length -1  == lastIndex){
        this.isloading = false;
        this.map_Service.initMap(this.maping,null,null);
       }else{
       }
      },error:(e) => {
        this.isloading = false;
        const error : ErrorCom = {
          title : "Algo ha sucedido 😥",
          header : "Aún no podrás ver el mapa 😞",
          boddy : "Por favor inténtelo más tarde",
          textAux : ""
        }
        this.error_Service.setComponent(error);
        this.isError = true;
        console.log("Error: ", e)
      }
     })
    
    }
    
   })
  
  }
  ngOnInit(): void {
  
  }
  ngAfterViewInit(): void {
    
   
   
  }


}
