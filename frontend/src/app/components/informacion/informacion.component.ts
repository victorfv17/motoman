import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

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
  public isLoading: boolean = true;
  public isLoadingEscuderias: boolean = true;
  public direct: string = 'asc';
  public campo: string = 'nombre';
  private cont = 0;
  sorted: IPilotos;
  constructor(
    private pilotosService: PilotosService,

  ) { }

  ngOnInit() {

    this.getPilotos();



  }
  public getPilotos() {

    this.pilotosService.getAllSort(this.campo, this.direct).subscribe(pilotos => {
      this.pilotos = pilotos;
      console.log(this.pilotos)
      this.isLoading = false;
      /* this.pilotos.forEach(piloto => {
 
         this.escuderiasService.getEscuderia(piloto.id_escuderia).subscribe((escuderia: IEscuderias) => {
           this.escuderia = escuderia[0];
           piloto.nombre_escuderia = this.escuderia.nombre;
 
           this.cont = this.cont + 1;
           //comprobacion para que no se cargue la pagina hasta que esten todas las escuderias
           if (this.pilotos.length === this.cont) {
             this.isLoading = false;
           }
 
 
         });
 
 
       });*/

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
