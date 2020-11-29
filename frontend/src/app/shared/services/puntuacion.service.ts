import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPuntuacion } from '../models/puntuacion.model';
import { IPilotos } from '../models/pilotos.model';
;

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de puntuaciones
 */
export class PuntuacionService {
  /**
   * Constructor para el servicio de puntuaciones
   * @param http 
   */
  constructor(private http: HttpClient) {

  }
  /**
   * Obtiene las puntuaciones del usuario ordenadas por un campo y un sentido 
   * @param  {number} liga
   * @param  {string} campoOrdenacion
   * @param  {string} direct
   * @returns Observable
   */
  public getPuntuacionByUser(liga: number, campoOrdenacion: string, direct: string): Observable<Array<IPuntuacion>> {
    return this.http.get<Array<IPuntuacion>>(`http://127.0.0.1:8000/api/clasificacion/join/${liga}/${campoOrdenacion}/${direct}`);

  }
  /**
   * Obtiene las puntuaciones de los pilotos ordenadas por un campo y un sentido
   * @param  {string} campo
   * @param  {string} direct
   * @returns Observable
   */
  public getPuntuacionesPilotos(campo: string, direct: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://127.0.0.1:8000/api/puntos/pilotos/${campo}/${direct}`);

  }
  /**
   * Obtiene las puntuaciones de las escuderias ordenadas por un campo y un sentido
   * @param  {string} campo
   * @param  {string} direct
   * @returns Observable
   */
  public getPuntuacionesEscuderias(campo: string, direct: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://127.0.0.1:8000/api/puntos/escuderias/${campo}/${direct}`);

  }
  /**
   * Añade las puntuaciones
   * @param  {Array<any>} puntuaciones
   * @returns Observable
   */
  public addPuntos(puntuaciones: Array<any>): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/puntos', puntuaciones);

  }
  /**
   * Actualiza las puntuaciones de todos los usuarios, pilotos y escuderias
   * @returns Observable
   */
  public actualizarPuntos(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/puntos/actualizar/usuarios');

  }
  /**
   * Borra todas las puntuaciones
   * @returns Observable
   */
  public deletePuntos(): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/puntos/guardados/borrar/todos/ligas');

  }

}
