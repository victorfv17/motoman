import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/shared/models/equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';

@Component({
  selector: 'app-tab-vender-pilotos',
  templateUrl: './tab-vender-pilotos.component.html',
  styleUrls: ['./tab-vender-pilotos.component.scss']
})
export class TabVenderPilotosComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    this.equipoService.getEquipo(this.usuario.usuario.id, 'pilotos').subscribe((equipo) => {
      this.equipos = equipo;
      console.log('equipo', this.equipos);
    });
  }
  public venderPiloto(piloto: any) {
    this.equipoService.venderPiloto(piloto.id).subscribe(() => {
      this.equipos = [];
      this.getEquipo();
    });

  }
}
