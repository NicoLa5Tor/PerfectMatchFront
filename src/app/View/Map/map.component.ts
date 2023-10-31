import { Component,  AfterViewInit } from '@angular/core';
import { GeoNamesService } from 'src/app/Services/geonames.service';
import { ApiPublicationService } from 'src/app/Services/api-publication.service';
import { from } from 'rxjs';
import { Publication } from 'src/app/Models/publication';
import {  map } from 'rxjs/operators';
import { concatMap, delay } from 'rxjs/operators';
import { MapService } from 'src/app/Services/map.services';
import { Location } from 'src/app/Models/Location';
import { da } from 'date-fns/locale';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

//
  date: any;
  listAnimals: Publication[] = [];
  maping : Location [] = []

  constructor(private geoN: GeoNamesService,
    private listA: ApiPublicationService,
    private map_Service : MapService) {
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
        console.log("ya acabó: ");
        this.map_Service.initMap(this.maping,null,null);
       }else{
        console.log("aun no es el final")
       }
      
      },error:(e) => {
        console.log("Error: ", e)
      }
     })
    
    }
    
   })
  
  }
  ngAfterViewInit(): void {
    
   
   
  }


}
