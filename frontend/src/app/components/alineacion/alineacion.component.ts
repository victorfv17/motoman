import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { MatDialog } from '@angular/material/dialog';
import { AlineacionDialogComponent } from './alineacion-dialog/alineacion-dialog.component';
import { IUser } from 'src/app/shared/models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-alineacion',
  templateUrl: './alineacion.component.html',
  styleUrls: ['./alineacion.component.scss']
})
/**
 * Clase para el componente de alineacion
 */
export class AlineacionComponent implements OnInit {
  equipo = {
    id: '',
    pilotosMotoGp: '',
    escuderiasMotoGp: ''
  };
  usuario: IUser = {};
  equipoModel: any;
  indicadorEnAlineacion = false;
  copiarAlineacion = true;
  alineaciones = {
    idPrimerPiloto: '',
    primerPiloto: '',
    idSegundoPiloto: '',
    segundoPiloto: '',
    idEscuderia: '',
    nombreEscuderia: ''
  }
  public isLoading: boolean = true;
  /**
   * Constructor para el componente de alineacion
   * @param  {MatDialog} publicdialog
   * @param  {EquipoService} privateequipoService
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    public dialog: MatDialog,
    private equipoService: EquipoService,
    private snackbar: MatSnackBar
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.fetchAlineacion();

    this.marcarDeshabilitadoPorDia();
  }
  /**
   * Abre modal de elegir pilotos o escuderías de tu equipo para la alineación
   * @param  {string} cadena //cadena para comprobar si es piloto o escuderia
   * @returns void
   */
  openDialog(cadena: string): void {


    const dialogRef = this.dialog.open(AlineacionDialogComponent, {
      width: '250px',
      data: {
        alineaciones: this.alineaciones,
        tipo: cadena,


      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkTipo(result);
      }
    });
  }
  /**
   * Obtiene la alineación del usuario
   */
  public fetchAlineacion() {

    this.equipoService.getAlineacion(this.usuario.usuario.id).subscribe((equipo) => {

      equipo.forEach(element => {
        if (element.piloto_id && !this.alineaciones.primerPiloto) {
          this.alineaciones.idPrimerPiloto = element.idEquipo;
          this.alineaciones.primerPiloto = element.nombre;
        } else if (element.piloto_id && this.alineaciones.primerPiloto) {
          this.alineaciones.idSegundoPiloto = element.idEquipo;
          this.alineaciones.segundoPiloto = element.nombre;
        } else {
          this.alineaciones.idEscuderia = element.idEquipo;
          this.alineaciones.nombreEscuderia = element.nombre;
        }
      });

      if (this.copiarAlineacion) {
        localStorage.setItem('alineacion', JSON.stringify(this.alineaciones));
        this.copiarAlineacion = false;
      }
      this.isLoading = false;

    });
  }
  /**
   * Guarda la alineación elegida por el usuario
   */
  public guardar() {
    this.equipoService.storeAlineacion(this.usuario.usuario.id, this.alineaciones).subscribe(() => {
      localStorage.setItem('alineacion', JSON.stringify(this.alineaciones));
      this.snackbar.open('Alineación guardada', null, {
        duration: 2000
      })
    });
  }
  /**
   * Borra los datos de la alineacion para dejarlos en blanco
   */
  public borrarAlineacion() {
    this.alineaciones = {
      idPrimerPiloto: undefined,
      idSegundoPiloto: undefined,
      idEscuderia: undefined,
      primerPiloto: undefined,
      segundoPiloto: undefined,
      nombreEscuderia: undefined
    };
    this.guardar();
  }
  /**
   * Se ejecuta al cerrar la modal y comprueba los datos elegidos para asignarlos a cada campo de la alineacion
   * @param  {any} result //datos seleccionados en la modal
   */
  private checkTipo(result: any) {
    switch (result.tipo) {
      case 'primerPiloto':
        this.alineaciones.idPrimerPiloto = result.equipo.idEquipo;
        this.alineaciones.primerPiloto = result.equipo.nombre;
        break;
      case 'segundoPiloto':
        this.alineaciones.idSegundoPiloto = result.equipo.idEquipo;
        this.alineaciones.segundoPiloto = result.equipo.nombre;
        break;
      case 'escuderia':
        this.alineaciones.idEscuderia = result.equipo.idEquipo;
        this.alineaciones.nombreEscuderia = result.equipo.nombre;
        break;
    }
    localStorage.setItem('alineacion', JSON.stringify(this.alineaciones));
  }
  /**
   * Deshabilita el boton de guardar alineacion si es fin de semana para que no puedan guardar la alineacion
   * @returns boolean 
   */
  public marcarDeshabilitadoPorDia(): boolean {
    let dia = moment().format('dddd');
    return dia === 'Saturday' || dia === 'Sunday' ? true : false;
  }

}
