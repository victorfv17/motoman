import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { MercadoComponent } from './mercado.component';


const routes: Routes = [
  { path: '', component: MercadoComponent },
  { path: 'comprar', component: ComprarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadoRoutingModule { }
