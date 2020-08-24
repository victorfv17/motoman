import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutenticacionGuard } from './autenticacion/autenticacion.guard';
import { HomeComponent } from './home/home.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';

import { AlineacionComponent } from './components/alineacion/alineacion.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { EscuderiasComponent } from './components/escuderias/escuderias.component';
import { EscuderiasAddComponent } from './components/escuderias/escuderias-add/escuderias-add.component';

import { PilotosComponent } from './components/pilotos/pilotos.component';
import { PilotosDetailComponent } from './components/pilotos/pilotos-detail/pilotos-detail.component';
import { PilotosAddComponent } from './components/pilotos/pilotos-add/pilotos-add.component';
import { RegistroComponent } from './components/registro/registro.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AutenticacionGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'liga', loadChildren: () => import('./components/liga/liga.module').then((m) => m.LigaModule) },

  { path: 'escuderias', component: EscuderiasComponent },
  { path: 'escuderias/:id', component: EscuderiasAddComponent },
  { path: 'escuderias/nueva/escuderia', component: EscuderiasAddComponent },
  { path: 'clasificacion', component: ClasificacionComponent },
  { path: 'mercado', loadChildren: () => import('./components/mercado/mercado.module').then((m) => m.MercadoModule) },
  { path: 'alineacion', component: AlineacionComponent },
  { path: 'puntuacion', component: PuntuacionComponent },
  { path: 'pilotos', component: PilotosComponent },
  { path: 'pilotos/:id', component: PilotosDetailComponent },
  { path: 'pilotos/nuevo/piloto', component: PilotosAddComponent },
  { path: 'pilotos/editar/:id', component: PilotosAddComponent },
  { path: 'registro', component: RegistroComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
