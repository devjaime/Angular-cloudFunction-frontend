import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

import { WebsocketService } from '../../services/websocket.service';
import { locationService } from '../../services/location.service';
import { Lugar, Geolocation } from '../../interfaces/interfaces';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

interface RespMarcadores {
  [key: string]: Lugar
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] =[];
  mapa: mapboxgl.Map;
  // lugares: lugar[] = [];
  lugares: {[key: string]: Lugar} = {};
  markersMapbox: {[id: string]: mapboxgl.Marker} = {};

  constructor( private db: AngularFirestore,
              private http: HttpClient,
              private wsService: WebsocketService,
              private wsLocation: locationService ) { }

  ngOnInit() {

    this.db.collection('goty').valueChanges()
      .pipe(
        map( (resp: Game[]) => resp.map( ({ name, votos }) => ({ name, value: votos }) ))
      )
      .subscribe( juegos => {
        // console.log(juegos);
        this.juegos = juegos;
      });

      // mapa
    this.http.get<RespMarcadores>('https://socket-chile.herokuapp.com/mapa')
    .subscribe(lugares => {
       console.log('crear mapa',lugares);
      this.lugares = lugares;

      this.crearMapa();
    });

    this.escucharSocket();

  }
  escucharSocket() {
    // marcador-nuevo
    this.wsService.listen('marcador-nuevo')
    .subscribe( (marcador: Lugar) => this.agregarMarcador(marcador));
    this.wsService.listen('marcador-mover')
      .subscribe((marcador: Lugar) => {
          this.markersMapbox[marcador.id]
          .setLngLat([marcador.lng, marcador.lat]);
      });
    // instancia del marker setLngLat(lng,lat)

    // marcador-borrar
    this.wsService.listen('marcador-borrar')
    .subscribe( (id: string) => {
      this.markersMapbox[id].remove();
      delete this.markersMapbox[id];
    });

  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGV2amFpbWUiLCJhIjoiY2sybzVtOHlsMHp4czNibGxwN3pzN3V3ayJ9.YHdZbJlAWBAFnXTVieKsKQ';
    // this.obtenerGPS();
    // console.log('respuesta', this.GPS.lng);
    this.wsLocation.getPosition().then(GPS => {
        console.log(`GPS al crear mapa: ${GPS.lng} ${GPS.lat}`);
        this.mapa = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [GPS.lng, GPS.lat],
        zoom: 0.5
        });
        for( const [key, marcador] of Object.entries(this.lugares)) {
          this.agregarMarcador(marcador);
        }
    });
  }

  agregarMarcador(marcador: Lugar) {
    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;

    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = 'Borrar';
    
    const div = document.createElement('div');
    div.append(h2, btnBorrar);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div)

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    marker.on('drag', () => {
      const lnglat = marker.getLngLat();

      const nuevoMarcador = {
        id: marcador.id,
       ...lnglat
      }

      this.wsService.emit('marcador-mover', nuevoMarcador);
    });

    btnBorrar.addEventListener('click', () => {
      marker.remove();

      this.wsService.emit('marcador-borrar', marcador.id);

    });

    this.markersMapbox[marcador.id] = marker;

  }

  crearMarcador() {
    this.wsLocation.getPosition().then(GPS => {
      console.log(`GPS al crear mapa: ${GPS.lng} ${GPS.lat}`);
      const customMarker: Lugar = {
        id: new Date().toISOString(),
        lng: GPS.lng,
        lat: GPS.lat,
        nombre: 'name',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }
      
      this.agregarMarcador(customMarker);
  
      // emitir marcador-nuevo
      this.wsService.emit('marcador-nuevo', customMarker);
  });
  }
}