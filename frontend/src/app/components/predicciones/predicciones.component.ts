import { Component, OnInit } from '@angular/core';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { PrediccionesService } from 'src/app/shared/services/predicciones.service';
import { IPrediccion } from 'src/app/shared/models/prediccion.model';
import { IUser } from 'src/app/shared/models/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

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
  public isLoading: boolean = true;

  constructor(
    private pilotosService: PilotosService,
    private prediccionesService: PrediccionesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.inicializarPrediccion();
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.user = this.user.usuario;

    this.fetchPredicciones();
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
      this.isLoading = false;

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
      this.fetchPilotos();

    });
  }
  limpiarPredicciones() {
    this.inicializarPrediccion();
  }
  enviarPredicciones() {
    if (this.existenPredicciones) {
      this.prediccionesService.updatePrediccion(this.prediccion, this.user).subscribe(() => {
        this.snackbar.open('Prediccion guardada', null, {
          duration: 2000
        })
      });
    } else {
      this.prediccionesService.addPrediccion(this.prediccion, this.user).subscribe(() => {
        this.snackbar.open('Prediccion guardada', null, {
          duration: 2000
        })
      });
    }
  }

  deshabilitarPiloto(id: number) {
    const valores = Object.values(this.prediccion);

    return valores.includes(id);
  }

}
