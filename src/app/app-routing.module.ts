import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GotyComponent } from './pages/goty/goty.component';
import { MapaComponent } from './pages/mapa/mapa.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'goty', component: GotyComponent},
  {path: 'mapa', component: MapaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
