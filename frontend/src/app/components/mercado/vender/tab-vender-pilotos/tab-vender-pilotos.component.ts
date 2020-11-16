import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/shared/models/equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { PujasService } from 'src/app/shared/services/pujas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-vender-pilotos',
  templateUrl: './tab-vender-pilotos.component.html',
  styleUrls: ['./tab-vender-pilotos.component.scss']
})
export class TabVenderPilotosComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  public isLoading = true;
  constructor(
    private equipoService: EquipoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    this.isLoading = true;
    this.equipoService.getEquipo(this.usuario.usuario.id, 'pilotos').subscribe((equipo) => {
      this.equipos = equipo;
      this.isLoading = false;
    });
  }

  public venderPiloto(piloto: any) {
    this.equipoService.venta(piloto.idEquipo).subscribe(() => {
      this.usuario.usuario.saldo = this.usuario.usuario.saldo + piloto.valorMercado;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.snackBar.open('Venta realizada', 'exito', {
        duration: 2000,
      });
      this.equipos = [];
      this.getEquipo();
    });

  }
}
