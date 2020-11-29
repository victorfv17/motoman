import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { ILigas } from '../models/ligas.model';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de ligas
 */
export class LigasService {
  /**
   * Constructor para el servicio de ligas
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) {

  }
  /**
   * Crea la liga y añade el usuario
   * @param  {ILigas} liga
   * @param  {number} user
   * @returns Observable
   */
  public createLiga(liga: ILigas, user: number): Observable<ILigas> {
    liga.numParticipantes = 1;
    return this.http.post('http://127.0.0.1:8000/api/ligas', { liga: liga, usuario: user });
  }
  /**
   * Obtiene la liga del usuario
   * @param  {number} user
   * @returns Observable
   */
  public getLiga(user: number): Observable<ILigas> {
    return this.http.get('http://127.0.0.1:8000/api/ligas/' + user);
  }
  /**
   * Obtiene las ligas
   * @returns Observable
   */
  public getLigas(): Observable<Array<ILigas>> {
    return this.http.get<Array<ILigas>>('http://127.0.0.1:8000/api/ligas');
  }

}
