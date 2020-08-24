import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/shared/models/equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { PujasService } from 'src/app/shared/services/pujas.service';

@Component({
  selector: 'app-tab-vender-pilotos',
  templateUrl: './tab-vender-pilotos.component.html',
  styleUrls: ['./tab-vender-pilotos.component.scss']
})
export class TabVenderPilotosComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];

  constructor(
    private equipoService: EquipoService,
    private pujasService: PujasService

  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    this.equipoService.getEquipo(this.usuario.usuario.id, 'pilotos').subscribe((equipo) => {
      this.equipos = equipo;

    });
  }

  public venderPiloto(piloto: any) {
    this.equipoService.venta(piloto.id).subscribe(() => {
      this.usuario.usuario.saldo = this.usuario.usuario.saldo + piloto.valorMercado;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));

      this.equipos = [];
      this.getEquipo();
    });

  }
}
