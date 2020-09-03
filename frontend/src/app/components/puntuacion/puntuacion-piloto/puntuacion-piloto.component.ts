import { Component, OnInit } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-puntuacion-piloto',
  templateUrl: './puntuacion-piloto.component.html',
  styleUrls: ['./puntuacion-piloto.component.scss']
})
export class PuntuacionPilotoComponent implements OnInit {
  public pilotos: Array<IPilotos> = [];
  public direct: string = 'asc';
  public campo: string = 'nombre';
  public piloto: IPilotos;
  public isLoading: boolean = true;
  sorted: IPilotos;
  puntuaciones: Array<any> = [];
  constructor(
    private pilotosService: PilotosService,
    private puntuacionService: PuntuacionService
  ) { }

  ngOnInit() {
    this.getPilotos();
  }
  public getPilotos() {

    this.pilotosService.getAllSort(this.campo, this.direct).subscribe(pilotos => {
      this.pilotos = pilotos;
      console.log(this.pilotos)
      this.isLoading = false;
    });

  }
  public puntuacionPiloto(piloto: any) {
    let existe = this.puntuaciones.find(element => element === piloto);
    if (existe) {
      this.puntuaciones.splice(this.puntuaciones.indexOf(existe), 1);
    }
    this.puntuaciones.push(piloto);
    existe = undefined;
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
  public enviarPuntos() {
    console.log('this.puntaucion', this.puntuaciones);


    this.puntuacionService.addPuntos(this.puntuaciones).subscribe();
  }
  public updatePuntos() {



    this.puntuacionService.actualizarPuntos().subscribe();
  }
  public limpiarPuntos(form: NgForm) {
    form.reset();
  }
}
