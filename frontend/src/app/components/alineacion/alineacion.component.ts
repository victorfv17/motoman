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

  constructor(
    public dialog: MatDialog,
    private equipoService: EquipoService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.fetchAlineacion();

    this.marcarDeshabilitadoPorDia();
  }
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

        // this.equipo[cadena] = result.nombre;

        // this.equipo.id = result.id;

        // console.log('this.equipo', this.equipo);
      }
    });
  }
  public fetchAlineacion() {

    this.equipoService.getAlineacion(1).subscribe((equipo) => {

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


    });
  }
  public guardar() {
    this.equipoService.storeAlineacion(this.usuario.usuario.id, this.alineaciones).subscribe(() => {
      localStorage.setItem('alineacion', JSON.stringify(this.alineaciones));
      this.snackbar.open('Alineación guardada', null, {
        duration: 2000
      })
    });
  }
  public borrarAlineacion() {
    this.alineaciones = {
      idPrimerPiloto: undefined,
      idSegundoPiloto: undefined,
      idEscuderia: undefined,
      primerPiloto: undefined,
      segundoPiloto: undefined,
      nombreEscuderia: undefined
    };
  }
  private checkTipo(result: any) {
    console.log(result);

    switch (result.tipo) {
      case 'primerPiloto':
        this.alineaciones.idPrimerPiloto = result.equipo.id;
        this.alineaciones.primerPiloto = result.equipo.nombre;
        break;
      case 'segundoPiloto':
        this.alineaciones.idSegundoPiloto = result.equipo.id;
        this.alineaciones.segundoPiloto = result.equipo.nombre;
        break;
      case 'escuderia':
        this.alineaciones.idEscuderia = result.equipo.id;
        this.alineaciones.nombreEscuderia = result.equipo.nombre;
        break;
    }
  }
  public marcarDeshabilitadoPorDia(): boolean {
    let dia = moment().format('dddd');
    return dia !== 'Saturday' ? false : true;
  }

}
