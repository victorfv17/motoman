import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IMercado } from 'src/app/shared/models/mercado.model';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  public pilotos:any;
  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.mercadoService.getPilotosMercado().subscribe(pilotos => {
      this.pilotos = pilotos;
    });
  }

}
