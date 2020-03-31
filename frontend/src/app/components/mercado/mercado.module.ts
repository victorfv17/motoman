import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoRoutingModule } from './mercado-routing.module';
import { ComprarComponent } from './comprar/comprar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/core/material-module';
import { MercadoComponent } from './mercado.component';


@NgModule({
  declarations: [MercadoComponent, ComprarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MercadoRoutingModule
  ]
})
export class MercadoModule { }
