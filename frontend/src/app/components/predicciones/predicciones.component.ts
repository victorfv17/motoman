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
/**
 * Clase para el componente de apuestas
 */
export class PrediccionesComponent implements OnInit {
  pilotos: Array<IPilotos> = [];
  piloto: IPilotos = {};
  user: any;
  existenPredicciones = false;
  public prediccion = {
    pos1: undefined,
    pos2: undefined,
    pos3: undefined,
    pos4: undefined,
    pos5: undefined,
    pos6: undefined
  }
  public isLoading: boolean = true;
  /**
   * Constructor para el componente de apuestas
   * @param  {PilotosService} privatepilotosService
   * @param  {PrediccionesService} privateprediccionesService
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    private pilotosService: PilotosService,
    private prediccionesService: PrediccionesService,
    private snackbar: MatSnackBar
  ) { }
  /**
   * Metodo que se ejecuta al inicio y que obtiene el usuario de la storage
   */
  ngOnInit() {
    this.inicializarPrediccion();
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.user = this.user.usuario;

    this.fetchPredicciones();
  }
  /**
   * Inicializacion de la apuesta a vacio
   */
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
  /**
   * Obtiene los pilotos
   */
  private fetchPilotos() {
    this.pilotosService.getAll().subscribe((pilotos) => {
      this.pilotos = pilotos;
      this.isLoading = false;

    });
  }
  /**
   * Obtiene las apuestas del usuario
   */
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
  /**
   * Borra las apuestas
   */
  limpiarPredicciones() {
    this.inicializarPrediccion();
  }
  /**
   * Envia la apuesta del usuario con los pilotos y posiciones correspondientes
   * Edita o crea la apuesta dependiendo de si ya existe una apuesta anterior
   */
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
  /**
   * Deshabilita el piloto elegido para que no se pueda seleccionar varias veces
   * @param  {number} id //id del piloto
   */
  deshabilitarPiloto(id: number) {
    const valores = Object.values(this.prediccion);

    return valores.includes(id);
  }

}
