import { Component, OnInit } from '@angular/core';
import { IEquipo } from 'src/app/shared/models/equipo.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';

@Component({
  selector: 'app-tab-vender-escuderias',
  templateUrl: './tab-vender-escuderias.component.html',
  styleUrls: ['./tab-vender-escuderias.component.scss']
})
/**
 * Clase para el componente de vender escuderias
 */
export class TabVenderEscuderiasComponent implements OnInit {


  usuario: any;
  equipos: Array<IEquipo> = [];
  public isLoading: boolean = true;
  /**
   * Constructor para el componente de vender escuderias
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
   * Obtiene las escuderias del equipo del usuario
   */
  private getEquipo() {
    this.isLoading = true;
    this.equipoService.getEquipo(this.usuario.usuario.id, 'escuderias').subscribe((equipo) => {
      this.equipos = equipo;
      this.isLoading = false;
    });
  }
  /**
   * Ejecuta la venta de la escuderia y actualiza el saldo
   * @param  {any} escuderia //escuderia a vender
   */
  public venderEscuderia(escuderia: any) {
    this.equipoService.venta(escuderia.idEquipo).subscribe(() => {
      this.usuario.usuario.saldo = this.usuario.usuario.saldo + escuderia.valorMercado;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.equipos = [];
      this.getEquipo();
    });

  }
}
