import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoRoutingModule } from './mercado-routing.module';
import { ComprarComponent } from './comprar/comprar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/core/material-module';
import { MercadoComponent } from './mercado.component';
import { VenderComponent } from './vender/vender.component';
import { TabPilotosComponent } from './comprar/tab-pilotos/tab-pilotos.component';
import { TabEscuderiasComponent } from './comprar/tab-escuderias/tab-escuderias.component';
import { TabVenderPilotosComponent } from './vender/tab-vender-pilotos/tab-vender-pilotos.component';
import { TabVenderEscuderiasComponent } from './vender/tab-vender-escuderias/tab-vender-escuderias.component';
import { MinDirective } from './min-validator';


@NgModule({
  declarations: [MercadoComponent, ComprarComponent, VenderComponent, TabPilotosComponent, TabEscuderiasComponent, TabVenderPilotosComponent, TabVenderEscuderiasComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MercadoRoutingModule
  ]
})
export class MercadoModule { }
