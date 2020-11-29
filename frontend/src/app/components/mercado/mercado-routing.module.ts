import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { MercadoComponent } from './mercado.component';
import { VenderComponent } from './vender/vender.component';

//rutas del mercado
const routes: Routes = [
  { path: '', component: MercadoComponent },
  { path: 'comprar', component: ComprarComponent },
  { path: 'vender', component: VenderComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * Clase para las rutas del mercado
 */
export class MercadoRoutingModule { }
