import { Component, OnInit } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminarComponent } from './dialog-eliminar/dialog-eliminar.component';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.scss']
})
export class PilotosComponent implements OnInit {
  public pilotos: Array<IPilotos> = [];
  public escuderias: Array<IEscuderias>;
  public escuderia: IEscuderias;
  public piloto: IPilotos;
  public isLoading: boolean = true;
  public isLoadingEscuderias: boolean = true;
  public direct: string = 'asc';
  public campo: string = 'nombre';
  private cont = 0;
  sorted: IPilotos;
  constructor(
    private pilotosService: PilotosService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.getPilotos();
    const user = this.authenticationService.isAuthenticated();


  }
  public getPilotos() {

    this.pilotosService.getAllSort(this.campo, this.direct).subscribe(pilotos => {
      this.pilotos = pilotos;
      console.log(this.pilotos)
      this.isLoading = false;
    });

  }
  public delete(pilotoId: string) {
    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pilotosService.deletePiloto(pilotoId).subscribe(() => {
          this.getPilotos();
        });
      }
    });
  }


  sort(campo?: string) {
    if (this.direct === 'asc') {
      this.direct = 'desc';
    } else {
      this.direct = 'asc';
    }
    this.pilotosService.getAllSort(campo, this.direct).subscribe(pilotos => {
      this.pilotos = pilotos;
      this.isLoading = false;


    });

  }
}
