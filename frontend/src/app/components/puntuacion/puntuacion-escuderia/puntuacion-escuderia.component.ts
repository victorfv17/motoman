import { Component, OnInit } from '@angular/core';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-puntuacion-escuderia',
  templateUrl: './puntuacion-escuderia.component.html',
  styleUrls: ['./puntuacion-escuderia.component.scss']
})
export class PuntuacionEscuderiaComponent implements OnInit {
  public escuderias: Array<IEscuderias>;
  public escuderia: IEscuderias;
  puntuaciones: Array<any> = [];
  public isLoading: boolean = true;
  public direct: string = 'asc';
  public campo: string = 'nombre';
  constructor(
    private escuderiasService: EscuderiasService,
    private puntuacionService: PuntuacionService
  ) { }

  ngOnInit() {
    this.getEscuderias();
  }
  private getEscuderias() {

    this.escuderiasService.getAllSort(this.campo, this.direct).subscribe(escuderias => {
      this.escuderias = escuderias;
      this.isLoading = false;
    });

  }
  public puntuacionEscuderia(escuderia: any) {
    let existe = this.puntuaciones.find(element => element === escuderia);
    if (existe) {
      this.puntuaciones.splice(this.puntuaciones.indexOf(existe), 1);
    }
    this.puntuaciones.push(escuderia);
    existe = undefined;
  }
  sort(campo?: string) {
    if (this.direct === 'asc') {
      this.direct = 'desc';
    } else {
      this.direct = 'asc';
    }
    this.campo = campo;
    this.getEscuderias();

  }
  public enviarPuntos() {
    this.puntuacionService.addPuntos(this.puntuaciones).subscribe();
  }
  public updatePuntos() {



    this.puntuacionService.actualizarPuntos().subscribe();
  }
  public limpiarPuntos(form: NgForm) {
    form.reset();
  }

}
