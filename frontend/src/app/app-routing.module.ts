import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { InformacionDetailComponent } from './components/informacion/informacion-detail/informacion-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AutenticacionGuard } from './autenticacion/autenticacion.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'informacion', component: InformacionComponent },
  { path: 'informacion/:id', component: InformacionDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AutenticacionGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
