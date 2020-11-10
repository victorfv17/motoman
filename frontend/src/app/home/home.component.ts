import { Component, OnInit } from '@angular/core';
import { PujasService } from '../shared/services/pujas.service';
import { IPujas } from '../shared/models/pujas.model';
import { IPilotos } from '../shared/models/pilotos.model';
import { EquipoService } from '../shared/services/equipo.service';
import { IUser } from '../shared/models/users.model';

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
  private user: IUser = {};
  public isLoadingPujas: boolean = true;
  public isLoadingVentas: boolean = true;
  public isLoading: boolean = true;
  constructor(
    private pujasService: PujasService,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.fetchPujas();
    this.fetchVentas();
    if (this.isLoadingPujas && this.isLoadingVentas) {
      this.isLoading = false;
    }
  }

  private fetchPujas() {
    this.pujasService.getPujas(this.user.usuario.liga_id).subscribe((pujas) => {
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
      this.isLoadingPujas = false;

    });
  }
  private fetchVentas() {
    this.equipoService.getVentas(this.user.usuario.liga_id).subscribe((ventas) => {
      this.ventas = ventas;
      this.isLoadingVentas = false;
    }
    );
  }

}
