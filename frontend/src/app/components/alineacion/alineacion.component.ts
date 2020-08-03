import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { MatDialog } from '@angular/material/dialog';
import { AlineacionDialogComponent } from './alineacion-dialog/alineacion-dialog.component';
import { IUser } from 'src/app/shared/models/users.model';

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
  constructor(
    public dialog: MatDialog,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }
  openDialog(cadena: string): void {

    const dialogRef = this.dialog.open(AlineacionDialogComponent, {
      width: '250px',
      data: { tipo: cadena }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.equipo[cadena] = result.nombre;

      this.equipo.id = result.id;

      console.log('this.equipo', this.equipo);

    });
  }
  public guardar() {
    this.equipoService.storeAlineacion(this.usuario.usuario.id, this.equipo).subscribe();
    /*{
      piloto_id:'',
      escuderia_id:'',
      usuario:'',
      indicarod:true
    }*/
  }

}
