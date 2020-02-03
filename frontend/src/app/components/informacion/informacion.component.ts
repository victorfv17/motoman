import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
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
  public pilotos: Array<IPilotos> = [];
  public escuderias: Array<IEscuderias>;
  public escuderia: IEscuderias;
  public piloto: IPilotos;
  public isLoading = true;
  public direct: string = 'desc';
  sorted: IPilotos;
  constructor(
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService
  ) { }

  ngOnInit() {
    this.getPilotos();



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
          this.isLoading = false;
        });
      });

    });
  }


  sort(campo?: any) {
    if (this.direct === 'asc') {
      this.direct = 'des';
    } else {
      this.direct = 'asc';
    }
    this.pilotosService.columnSorted(campo, this.pilotos, this.direct);
  }
  /*detail(piloto: IPilotos) {
    console.log(piloto)
    this.pilotosService.getPiloto(piloto.id).subscribe((data) => {
      this.piloto = data;

    });
  }*/

}
