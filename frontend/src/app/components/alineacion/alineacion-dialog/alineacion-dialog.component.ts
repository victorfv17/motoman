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
/*
* Clase para la modal de la alineación de elegir piloto o escudería
*/
export class AlineacionDialogComponent implements OnInit {
  usuario: any;
  equipos: Array<IEquipo> = [];
  isLoading: boolean = true;
  /**
   * Constructor de la modal de alineacion
   * @param  {MatDialogRef<AlineacionDialogComponent>} publicdialogRef
   * @param  {} @Inject(MAT_DIALOG_DATA
   * @param  {any} publicdata
   * @param  {EquipoService} privateequipoService
   */
  constructor(
    public dialogRef: MatDialogRef<AlineacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipoService: EquipoService
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getEquipo();
  }
  /**
   * Obtiene los pilotos y escuderías del equipo del usuario
   */
  private getEquipo() {
    this.equipoService.getEquipo(this.usuario.usuario.id, this.data.tipo).subscribe((equipo) => {
      if (equipo) {
        const alineacion = JSON.parse(localStorage.getItem('alineacion'));
        this.equipos = equipo.filter((element) => element.nombre !== alineacion.primerPiloto && element.nombre !== alineacion.segundoPiloto && element.nombre !== alineacion.nombreEscuderia);
      }
      this.isLoading = false;


    });
  }
  /**
   * Se ejecuta cuando se cierra la modal y envia la informacion al componente alineacion
   * @param  {IEquipo} equipo
   */
  public closeDialog(equipo: IEquipo) {
    this.data = {
      equipo: equipo,
      tipo: this.data.tipo,

    }
    this.dialogRef.close(this.data);
  }

}
