import { Component, OnInit, ViewChild } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { NgForm } from '@angular/forms';
import { MatSelect, MatSelectChange, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-puntuacion-piloto',
  templateUrl: './puntuacion-piloto.component.html',
  styleUrls: ['./puntuacion-piloto.component.scss']
})
/**
 * Clase para el componente de puntuaciones de los pilotos
 */
export class PuntuacionPilotoComponent implements OnInit {
  isDisabled = true;
  valores = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  selected: any;
  public pilotos: Array<IPilotos> = [];
  public direct: string = 'asc';
  public campo: string = 'nombre';
  public piloto: IPilotos;
  public isLoading: boolean = true;
  sorted: IPilotos;
  puntuaciones: Array<any> = [];
  /**
   * Constructor para el componente de puntuaciones de pilotos
   * @param  {PilotosService} privatepilotosService
   * @param  {PuntuacionService} privatepuntuacionService
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    private pilotosService: PilotosService,
    private puntuacionService: PuntuacionService,
    private snackbar: MatSnackBar
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {

    this.fetchPuntuacionesPilotos(this.campo, this.direct);
  }
  /**
   * Obtiene los pilotos con sus puntuaciones
   * @param  {string} campo
   * @param  {string} direct
   */
  public fetchPuntuacionesPilotos(campo: string, direct: string) {

    this.puntuacionService.getPuntuacionesPilotos(campo, direct).subscribe(pilotos => {
      this.pilotos = pilotos;
      if (this.pilotos.find((element) => !isNullOrUndefined(element.puntos))) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      this.isLoading = false;

    });

  }
  /**
   * Asigna la puntuacion al piloto y comprueba si ya existe puntuacion para ese piloto
   * @param  {any} piloto
   */
  public puntuacionPiloto(piloto: any) {
    if (piloto.puntos) {
      this.isDisabled = false;
      let existe = this.puntuaciones.find(element => element === piloto);
      if (existe) {
        this.puntuaciones.splice(this.puntuaciones.indexOf(existe), 1);
      }
      this.puntuaciones.push(piloto);
      existe = undefined;
    } else {
      this.isDisabled = true;
      this.puntuaciones.splice(this.puntuaciones.indexOf(piloto), 1);
    }
  }
  /**
   * Obtiene las puntuaciones de los pilotos y las ordena
   * @param  {string} campo? // campo por el que ordenar
   */
  sort(campo?: string) {
    if (this.direct === 'asc') {
      this.direct = 'desc';
    } else {
      this.direct = 'asc';
    }
    this.fetchPuntuacionesPilotos(campo, this.direct);

  }
  /**
   * Envia las puntuaciones de los pilotos para guardarlas
   */
  public enviarPuntos() {
    this.puntuacionService.addPuntos(this.puntuaciones).subscribe(() => {
      this.snackbar.open('Puntuaciones añadidas', null, {
        duration: 2000
      })
    });
  }
  /**
   * Metodo para actualizar las puntuaciones de los usuarios y pilotos 
   */
  public updatePuntos() {
    this.puntuacionService.actualizarPuntos().subscribe(() => {
      this.snackbar.open('Puntuaciones actualizadas', null, {
        duration: 2000
      })
    });
  }
  /**
   * Borra las puntuaciones de los pilotos
   * @param  {NgForm} form
   */
  public limpiarPuntos(form: NgForm) {
    form.reset();
    this.pilotos.map((element) => element.puntos = null);
    this.puntuacionService.deletePuntos().subscribe(() => {
      this.snackbar.open('Puntuaciones añadidas', null, {
        duration: 2000
      })
    });
    this.isDisabled = true;
  }
  /**
   * Deshabilita los valores que ya han sido elegidos
   * @param  {number} valor
   * @returns boolean
   */
  public deshabilitarValores(valor: number): boolean {
    const existe = this.pilotos.find((piloto) => piloto.puntos === valor);
    if (existe) {
      return true;
    } else {
      return false;
    }
  }
}
