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
/**
 * Clase para el componente de escuderias
 */
export class EscuderiasComponent implements OnInit {
  public escuderias: Array<IEscuderias> = [];
  public escuderia: IEscuderias;

  public isLoading: boolean = true;
  public direct: string = 'desc';
  public campo: string = 'nombre';

  sorted: IEscuderias;
  public rolPermitido = false;
  /**
   * Constructor para el componente de escuderias
   * @param  {EscuderiasService} privateescuderiasService
   * @param  {AuthenticationService} privateauthenticationService
   * @param  {MatDialog} privatedialog
   */
  constructor(
    private escuderiasService: EscuderiasService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {

    this.fetchEscuderias(this.campo);
    const user = this.authenticationService.isAuthenticated();
    this.checkRolUser(user.usuario);

  }
  /**
   * Abre modal para la confirmación de eliminar el piloto
   * @param  {string} escuderiaId
   */
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

  /**
   * Obtiene las escuderias y las ordena
   * @param  {string} campo? //campo por el que ordenar
   */
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
  /**
   * Comprueba el rol de usuario para que sean visibles o no ciertas acciones
   * @param  {any} usuario //usuario a comprobar
   */
  private checkRolUser(usuario: any) {
    if (usuario.rol === 'admin') {
      this.rolPermitido = true;
    } else {
      this.rolPermitido = false;
    }
  }

}
