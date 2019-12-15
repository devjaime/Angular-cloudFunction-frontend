import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// socket
import { SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';
import { MapaComponent } from './pages/mapa/mapa.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GotyComponent,
    MapaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SocketIoModule.forRoot(environment.socketConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
