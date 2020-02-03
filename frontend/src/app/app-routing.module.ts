import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { InformacionDetailComponent } from './components/informacion/informacion-detail/informacion-detail.component';


const routes: Routes = [
  { path: 'informacion', component: InformacionComponent },
  { path: 'informacion/:id', component: InformacionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
