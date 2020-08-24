import { Component, OnInit } from '@angular/core';
import { PujasService } from '../shared/services/pujas.service';
import { IPujas } from '../shared/models/pujas.model';
import { IPilotos } from '../shared/models/pilotos.model';
import { EquipoService } from '../shared/services/equipo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public pujas: Array<IPujas> = [];
  public maxPuja: number;
  public pujasMasAltas: Array<IPujas> = [];
  public piloto: IPilotos = {};
  public ventas: Array<any> = [];
  constructor(
    private pujasService: PujasService,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {

    this.fetchPujas();
    this.fetchVentas();
  }

  private fetchPujas() {
    this.pujasService.getPujas().subscribe((pujas) => {
      this.pujas = pujas;

      console.log(pujas);

      let pujasCopia = pujas;
      pujas.forEach(element => {
        this.maxPuja = 0;
        pujasCopia = pujas.filter((elem) => { return elem.piloto === element.piloto || elem.escuderia === element.escuderia });

        pujasCopia.forEach((elemIguales) => {
          if (elemIguales.puja > this.maxPuja) {
            this.maxPuja = element.puja;

          }
        });
        element.maxPuja = this.maxPuja;

        this.pujasMasAltas.push(element)

      });

    });
  }
  private fetchVentas() {
    this.equipoService.getVentas().subscribe((ventas) =>
      this.ventas = ventas
    );
  }

}
