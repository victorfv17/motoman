import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { IUser } from 'src/app/shared/models/users.model';
import { IEquipo } from 'src/app/shared/models/equipo.model';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
/**
 * Clase padre para los componente de vender
 */
export class VenderComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  isLoading = false;
  /**
   * Constructor para el componente de vender
   * @param  {EquipoService} privateequipoService
   */
  constructor(private equipoService: EquipoService) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  /**
   * Obtiene el equipo del usuario
   */
  private getEquipo() {
    this.equipoService.getEquipo(this.usuario.usuario.id).subscribe((equipo) => {
      this.equipos = equipo;
    });
  }
  /**
   * Ejecuta la venta del piloto y actualiza el equipo
   * @param  {any} piloto
   */
  public venderPiloto(piloto: any) {
    this.equipoService.venta(piloto.id).subscribe(() => {
      this.equipos = [];
      this.getEquipo();
    });

  }

}
