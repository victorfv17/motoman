import { Component, OnInit } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { PrediccionesService } from 'src/app/shared/services/predicciones.service';
import { IPrediccion } from 'src/app/shared/models/prediccion.model';
import { IUser } from 'src/app/shared/models/users.model';

@Component({
  selector: 'app-predicciones',
  templateUrl: './predicciones.component.html',
  styleUrls: ['./predicciones.component.scss']
})
export class PrediccionesComponent implements OnInit {
  pilotos: Array<IPilotos> = [];
  piloto: IPilotos = {};
  user: any;
  existenPredicciones = false;
  private prediccion = {};
  prueba = false;
  constructor(
    private pilotosService: PilotosService,
    private prediccionesService: PrediccionesService
  ) { }

  ngOnInit() {
    this.inicializarPrediccion();
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.user = this.user.usuario;
    this.fetchPredicciones();
    this.fetchPilotos();
  }
  private inicializarPrediccion() {
    this.prediccion = {
      pos1: undefined,
      pos2: undefined,
      pos3: undefined,
      pos4: undefined,
      pos5: undefined,
      pos6: undefined
    }
  }
  private fetchPilotos() {
    this.pilotosService.getAll().subscribe((pilotos) => {
      this.pilotos = pilotos;

    });
  }
  private fetchPredicciones() {
    this.prediccionesService.getPredicciones(this.user).subscribe((predicciones) => {
      if (predicciones.length > 0) {
        this.existenPredicciones = true;
        this.prediccion = {
          pos1: predicciones[0]['piloto_id'],
          pos2: predicciones[1]['piloto_id'],
          pos3: predicciones[2]['piloto_id'],
          pos4: predicciones[3]['piloto_id'],
          pos5: predicciones[4]['piloto_id'],
          pos6: predicciones[5]['piloto_id']
        }
      }

    });
  }
  limpiarPredicciones() {
    this.inicializarPrediccion();
  }
  enviarPredicciones() {
    if (this.existenPredicciones) {
      this.prediccionesService.updatePrediccion(this.prediccion, this.user).subscribe();
    } else {
      this.prediccionesService.addPrediccion(this.prediccion, this.user).subscribe();
    }
  }

  deshabilitarPiloto(id: number) {
    const valores = Object.values(this.prediccion);

    return valores.includes(id);
  }

}
