import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { IUser } from 'src/app/shared/models/users.model';
import { IEquipo } from 'src/app/shared/models/equipo.model';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  isLoading = false;
  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    this.equipoService.getEquipo(this.usuario.usuario.id).subscribe((equipo) => {
      this.equipos = equipo;
      console.log('equipo', this.equipos);
    });
  }
  public venderPiloto(piloto: any) {
    this.equipoService.venta(piloto.id).subscribe(() => {
      this.equipos = [];
      this.getEquipo();
    });

  }

}
