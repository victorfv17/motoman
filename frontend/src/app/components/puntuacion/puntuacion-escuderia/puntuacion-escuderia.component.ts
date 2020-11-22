import { Component, OnInit } from '@angular/core';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-puntuacion-escuderia',
  templateUrl: './puntuacion-escuderia.component.html',
  styleUrls: ['./puntuacion-escuderia.component.scss']
})
export class PuntuacionEscuderiaComponent implements OnInit {
  isDisabled = true;
  valores = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  public escuderias: Array<IEscuderias>;
  public escuderia: IEscuderias;
  puntuaciones: Array<any> = [];
  public isLoading: boolean = true;
  public direct: string = 'asc';
  public campo: string = 'nombre_escuderia';
  constructor(
    private puntuacionService: PuntuacionService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchEscuderias(this.campo, this.direct);
  }
  private fetchEscuderias(campo: string, direct: string) {

    this.puntuacionService.getPuntuacionesEscuderias(campo, direct).subscribe(escuderias => {
      this.escuderias = escuderias;
      if (this.escuderias.find((element) => !isNullOrUndefined(element.puntos_escuderia))) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      this.isLoading = false;

    });


  }
  public puntuacionEscuderia(escuderia: any) {
    if (escuderia.puntos_escuderia) {
      this.isDisabled = false;
      let existe = this.puntuaciones.find(element => element === escuderia);
      if (existe) {
        this.puntuaciones.splice(this.puntuaciones.indexOf(existe), 1);
      }
      this.puntuaciones.push(escuderia);
      existe = undefined;
    } else {
      this.isDisabled = true;
      this.puntuaciones.splice(this.puntuaciones.indexOf(escuderia), 1);
    }
  }
  sort(campo?: string) {
    if (this.direct === 'asc') {
      this.direct = 'desc';
    } else {
      this.direct = 'asc';
    }
    this.campo = campo;
    this.fetchEscuderias(campo, this.direct);

  }
  public enviarPuntos() {
    this.puntuacionService.addPuntos(this.puntuaciones).subscribe(() => {
      this.snackbar.open('Puntuaciones añadidas', null, {
        duration: 2000
      })
    });
  }
  public updatePuntos() {
    this.puntuacionService.actualizarPuntos().subscribe(() => {
      this.snackbar.open('Puntuaciones actualizadas', null, {
        duration: 2000
      })
    });
  }
  public limpiarPuntos(form: NgForm) {
    form.reset();
    this.escuderias.map((element) => element.puntos_escuderia = null);
    this.puntuacionService.deletePuntos().subscribe(() => {
      this.snackbar.open('Puntuaciones añadidas', null, {
        duration: 2000
      })
    });
    this.isDisabled = true;
  }

  public deshabilitarValores(valor: number): boolean {
    const existe = this.escuderias.find((escuderia) => escuderia.puntos_escuderia === valor);
    if (existe) {
      return true;
    } else {
      return false;
    }
  }


}
