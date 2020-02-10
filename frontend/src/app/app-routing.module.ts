import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { InformacionDetailComponent } from './components/informacion/informacion-detail/informacion-detail.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'informacion', component: InformacionComponent },
  { path: 'informacion/:id', component: InformacionDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
