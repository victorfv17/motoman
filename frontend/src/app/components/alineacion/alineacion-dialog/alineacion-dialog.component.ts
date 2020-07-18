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
    switch (this.data.tipo) {
      case "pilotosMotoGp":

        this.getEquipo('pilotos');
        break;
      case "pilotosMoto2":
        break;
      case "pilotosMoto3":
        break;
      case "escuderiasMotoGp":
        this.getEquipo('escuderias');
        break;
      case "escuderiasMoto2":
        break;
      case "escuderiasMoto3":
        break;
      default:
        break;
    }
  }
  private getEquipo(tipo: string) {
    this.equipoService.getEquipo(this.usuario.usuario.id, tipo).subscribe((equipo) => {
      this.equipos = equipo;
      console.log('equipo', this.equipos);
    });
  }
  public closeDialog(equipo: IEquipo) {
    this.data = equipo;
    this.dialogRef.close(this.data);
  }

}
