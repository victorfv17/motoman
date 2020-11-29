import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigaCreateComponent } from './liga-create/liga-create.component';
import { LigaComponent } from './liga.component';
import { LigaSearchComponent } from './liga-search/liga-search.component';

//rutas a las que navegar
const routes: Routes = [
  { path: '', component: LigaComponent },
  { path: 'liga-create', component: LigaCreateComponent },
  { path: 'liga-search', component: LigaSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
//Clase para las rutas de las ligas
export class LigaRoutingModule { }
