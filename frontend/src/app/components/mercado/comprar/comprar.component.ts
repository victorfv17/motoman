import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IMercado } from 'src/app/shared/models/mercado.model';
import { IUser } from 'src/app/shared/models/users.model';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { PujasService } from 'src/app/shared/services/pujas.service';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';
import { format } from 'url';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
/**
 * Clase padre para el componente de comprar
 */
export class ComprarComponent implements OnInit {
  isLoading = false;
  saldoRestante: number;
  /**
   * Constructor para el componente de comprar
   */
  constructor(
  ) { }
  /**
   * Se ejecuta al inicio
   */
  ngOnInit() {

  }
  /**
   * Actualiza el saldo restante para los dos componentes hijo(tab-pilotos y tab-escuderias)
   * @param saldoRestante 
   */
  obtenerSaldoRestante(saldoRestante: number) {
    this.saldoRestante = saldoRestante;
  }


}
