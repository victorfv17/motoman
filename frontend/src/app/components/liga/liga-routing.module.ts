import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigaCreateComponent } from './liga-create/liga-create.component';
import { LigaComponent } from './liga.component';


const routes: Routes = [
  { path: '', component: LigaComponent },
  { path: 'liga-create', component: LigaCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigaRoutingModule { }
