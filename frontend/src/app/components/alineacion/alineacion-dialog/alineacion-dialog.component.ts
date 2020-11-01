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

    this.equipoService.getEquipo(this.usuario.usuario.id, this.data.tipo).subscribe((equipo) => {
      if (equipo) {
        console.log('entra', equipo);
        equipo.forEach(element => {
          if (element.id === this.data.alineaciones.idPrimerPiloto) {
            const alineacion = JSON.parse(localStorage.getItem('alineacion'));
            element.id = alineacion.idPrimerPiloto
            element.nombre = alineacion.primerPiloto;

          } else if (element.id === this.data.alineaciones.idSegundoPiloto) {
            const alineacion = JSON.parse(localStorage.getItem('alineacion'));
            element.id = alineacion.idSegundoPiloto
            element.nombre = alineacion.segundoPiloto;
          } else if (element.id === this.data.alineaciones.idEscuderia) {
            const alineacion = JSON.parse(localStorage.getItem('alineacion'));
            element.id = alineacion.idEscuderia;
            element.nombre = alineacion.nombreEscuderia;
          }
        });

        // equipo = equipo.filter((element) =>

        //   element.id !== this.data.alineacion.idPrimerPiloto

        //   // element.piloto_id !== this.data.alineacion.idSegundoPiloto &&
        //   // element.escuderia_id !== this.data.alineacion.idEscuderia
        // );


        this.equipos = equipo;

      }


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
