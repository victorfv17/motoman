import { Component, OnInit } from '@angular/core';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { DialogEliminarComponent } from '../pilotos/dialog-eliminar/dialog-eliminar.component';


@Component({
  selector: 'app-escuderias',
  templateUrl: './escuderias.component.html',
  styleUrls: ['./escuderias.component.scss']
})
export class EscuderiasComponent implements OnInit {
  public escuderias: Array<IEscuderias> = [];
  public escuderia: IEscuderias;

  public isLoading: boolean = true;
  public direct: string = 'asc';
  public campo: string = 'nombre';

  sorted: IEscuderias;
  public rolPermitido = false;
  constructor(
    private escuderiasService: EscuderiasService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.fetchEscuderias(this.campo);
    const user = this.authenticationService.isAuthenticated();
    this.checkRolUser(user.usuario);

  }
  public delete(escuderiaId: string) {
    const dialogRef = this.dialog.open(DialogEliminarComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.escuderiasService.deleteEscuderia(escuderiaId).subscribe(() => {
          this.fetchEscuderias(this.campo);
        });
      }
    });
  }


  fetchEscuderias(campo?: string) {
    if (this.direct === 'asc') {
      this.direct = 'desc';
    } else {
      this.direct = 'asc';
    }
    this.escuderiasService.getAllSort(campo, this.direct).subscribe(escuderias => {
      this.escuderias = escuderias;
      this.isLoading = false;


    });

  }
  private checkRolUser(usuario: any) {
    if (usuario.rol === 'admin') {
      this.rolPermitido = true;
    } else {
      this.rolPermitido = false;
    }
  }

}
