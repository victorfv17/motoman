import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { InformacionDetailComponent } from './components/informacion/informacion-detail/informacion-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AutenticacionGuard } from './autenticacion/autenticacion.guard';
import { HomeComponent } from './home/home.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { LigaComponent } from './components/liga/liga.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AutenticacionGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'liga', component: LigaComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'informacion/:id', component: InformacionDetailComponent },
  { path: 'clasificacion', component: ClasificacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
