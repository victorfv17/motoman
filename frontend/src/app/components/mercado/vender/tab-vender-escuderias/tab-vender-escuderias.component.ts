import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/shared/models/equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';

@Component({
  selector: 'app-tab-vender-escuderias',
  templateUrl: './tab-vender-escuderias.component.html',
  styleUrls: ['./tab-vender-escuderias.component.scss']
})
export class TabVenderEscuderiasComponent implements OnInit {


  usuario: any;
  equipos: Array<IEquipo> = [];
  public isLoading: boolean = true;
  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    this.isLoading = true;
    this.equipoService.getEquipo(this.usuario.usuario.id, 'escuderias').subscribe((equipo) => {
      this.equipos = equipo;
      this.isLoading = false;
    });
  }
  public venderEscuderia(escuderia: any) {
    this.equipoService.venta(escuderia.id).subscribe(() => {
      this.usuario.usuario.saldo = this.usuario.usuario.saldo + escuderia.valorMercado;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.equipos = [];
      this.getEquipo();
    });

  }
}
