import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPuntuacion } from '../models/puntuacion.model';
import { IPilotos } from '../models/pilotos.model';
;

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private http: HttpClient) {

  }
  public getPuntuacionByUser(liga: number, campoOrdenacion: string, direct: string): Observable<Array<IPuntuacion>> {
    return this.http.get<Array<IPuntuacion>>(`http://127.0.0.1:8000/api/clasificacion/join/${liga}/${campoOrdenacion}/${direct}`);

  }
  public getPuntuacionesPilotos(campo: string, direct: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://127.0.0.1:8000/api/puntos/pilotos/${campo}/${direct}`);

  }
  public getPuntuacionesEscuderias(campo: string, direct: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://127.0.0.1:8000/api/puntos/escuderias/${campo}/${direct}`);

  }
  public addPuntos(puntuaciones: Array<any>): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/puntos', puntuaciones);

  }
  public actualizarPuntos(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/puntos/actualizar/usuarios');

  }
  public deletePuntos(): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/puntos/guardados/borrar/todos/ligas');

  }

}
