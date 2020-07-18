import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/shared/services/equipo.service';
import { MatDialog } from '@angular/material/dialog';
import { AlineacionDialogComponent } from './alineacion-dialog/alineacion-dialog.component';

@Component({
  selector: 'app-alineacion',
  templateUrl: './alineacion.component.html',
  styleUrls: ['./alineacion.component.scss']
})
export class AlineacionComponent implements OnInit {
  equipo = {
    pilotosMotoGp: '',
    escuderiasMotoGp: ''
  };
  indicadorEnAlineacion = false;
  constructor(
    public dialog: MatDialog,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {

  }
  openDialog(cadena: string): void {

    const dialogRef = this.dialog.open(AlineacionDialogComponent, {
      width: '250px',
      data: { tipo: cadena }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.equipo[cadena] = result.nombre;

    });
  }
  public guardar() {
    this.indicadorEnAlineacion = true;
    //this.equipoService.storeAlineacion().subscribe();
  }

}
