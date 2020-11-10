import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/shared/models/users.model';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { IEquipo } from 'src/app/shared/models/equipo.model';

@Component({
  selector: 'app-alineacion-dialog',
  templateUrl: './alineacion-dialog.component.html',
  styleUrls: ['./alineacion-dialog.component.scss']
})
export class AlineacionDialogComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  isLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<AlineacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  private getEquipo() {
    console.log(this.data.tipo)
    this.equipoService.getEquipo(this.usuario.usuario.id, this.data.tipo).subscribe((equipo) => {
      if (equipo) {
        console.log('entra', equipo);
        console.log('primer', this.data.alineaciones);
        const alineacion = JSON.parse(localStorage.getItem('alineacion'));

        this.equipos = equipo.filter((element) => element.nombre !== alineacion.primerPiloto && element.nombre !== alineacion.segundoPiloto && element.nombre !== alineacion.nombreEscuderia);
        console.log(this.equipos)
        //marc libre === andrea ianone
        // if (element.idEquipo === this.data.alineaciones.idPrimerPiloto) {
        //   const alineacion = JSON.parse(localStorage.getItem('alineacion'));
        //   if (alineacion.idSegundoPiloto === element.idEquipo) {
        //     element.idEquipo = null;
        //     element.nombre = null;
        //   } else {
        //     element.idEquipo = alineacion.idPrimerPiloto
        //     element.nombre = alineacion.primerPiloto;
        //   }

        // } else if (element.idEquipo === this.data.alineaciones.idSegundoPiloto) {
        //   const alineacion = JSON.parse(localStorage.getItem('alineacion'));
        //   if (alineacion.idPrimerPiloto === element.idEquipo) {
        //     element.idEquipo = null;
        //     element.nombre = null;
        //   } else {
        //     element.idEquipo = alineacion.idSegundoPiloto
        //     element.nombre = alineacion.segundoPiloto;
        //   }

        // } else if (element.idEquipo === this.data.alineaciones.idEscuderia) {
        //   const alineacion = JSON.parse(localStorage.getItem('alineacion'));
        //   element.idEquipo = alineacion.idEscuderia;
        //   element.nombre = alineacion.nombreEscuderia;
        // }



        // equipo = equipo.filter((element) =>

        //   element.id !== this.data.alineacion.idPrimerPiloto

        //   // element.piloto_id !== this.data.alineacion.idSegundoPiloto &&
        //   // element.escuderia_id !== this.data.alineacion.idEscuderia
        // );


        // this.equipos = equipo;

      }
      this.isLoading = false;


    });
  }
  public closeDialog(equipo: IEquipo) {
    this.data = {
      equipo: equipo,
      tipo: this.data.tipo,

    }
    this.dialogRef.close(this.data);
  }

}
