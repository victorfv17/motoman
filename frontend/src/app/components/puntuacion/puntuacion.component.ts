import { Component, OnInit } from '@angular/core';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.scss']
})
export class PuntuacionComponent implements OnInit {
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
  puntuaciones: Array<any> = [];
  constructor(
    private pilotosService: PilotosService,
    private authenticationService: AuthenticationService,
    private puntuacionService: PuntuacionService

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


    this.puntuacionService.addPuntosPiloto(this.puntuaciones).subscribe();
  }
  public limpiarPuntos(form: NgForm) {
    form.reset();
  }
}
