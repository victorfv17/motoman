import { Component, OnInit } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  public pilotos: Array<IPilotos>;
  public escuderias: Array<IEscuderias>;
  public escuderia: IEscuderias;
  public isLoading = true;
  constructor(
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService
  ) { }

  ngOnInit() {
    this.getPilotos();
    this.getEscuderias();


  }
  public getPilotos() {
    //peticion que trae todos los pilotos
    this.pilotosService.getAll().subscribe(pilotos => {
      this.pilotos = pilotos;
      this.isLoading = false;
      //recorro el array de pilotos
      this.pilotos.forEach(piloto => {
        //traigo la escuderia correspondiente a ese piloto
        this.escuderiasService.getEscuderia(piloto.id_escuderia).subscribe((escuderia: IEscuderias) => {
          this.escuderia = escuderia[0];
          piloto.nombre_escuderia = this.escuderia.nombre;
        });
      });

    });
  }
  public getEscuderias() {
    this.escuderiasService.getAll().subscribe(escuderias => {
      this.escuderias = escuderias;
      this.isLoading = false;
    });
  }

}
