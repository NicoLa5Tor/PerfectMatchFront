import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '../Models/Location';
import 'leaflet.markercluster';


@Injectable({
    providedIn: 'root',
})
export class MapService {
    local: Location[] = []
    latCenter : any;
    longCenter : any;
    initMap(list: Location[], longCenter : any, latCenter : any) {
        this.local = list;
        
    //    console.log("Datos: ", this.local)
    if(longCenter != null && latCenter != null){
      this.latCenter = latCenter
      this.longCenter = longCenter
    }else{
        this.latCenter = 4.5709
        this.longCenter = -74.2973
    }
        var map = L.map('map', {
            center: [this.longCenter,this.latCenter], // Coordenadas del centro de Bogotá, Colombia
            zoom: 10,
            dragging: true, // Deshabilita la función de arrastre del mapa
            touchZoom: false, // Deshabilita el zoom táctil
            zoomControl: false
        }).setView([4.5709, -74.2973], 6);

        // Agregar una capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //icono personalizado 
        var customIcon = L.icon({
            iconUrl: '../assets/logo.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        var clusterIcon = L.icon({
            iconUrl : '../assets/Logo-Group.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]

        })
        // Agregar un marcador en una ubicación específica
        var markerCluster = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function (cluster) {
                // Decide qué icono utilizar según si está agrupado o no
                if (cluster.getChildCount() > 1) {
                  return clusterIcon // Icono para clusters agrupados
                } else {
                  return customIcon; // Icono para marcadores individuales
                }
              }
        });
        this.local.forEach((element) => {

            var marker = L.marker([element.latitud, element.longitud], { icon: customIcon }).addTo(map);
            // Puedes agregar un pop-up al marcador
            if (marker) {
                console.log("pone: ", element.Name)
            } else {
                console.log("No pone: ", element.Name)
            }
            marker.bindPopup(element.Name)
            markerCluster.addLayer(marker)
        })
        map.addLayer(markerCluster)
    }



}