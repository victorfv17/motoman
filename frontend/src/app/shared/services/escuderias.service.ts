import { Injectable } from '@angular/core';
import { IEscuderias } from '../models/escuderias.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de escuderias
 */
export class EscuderiasService {
  /**
   * Constructor para el servicio de escuderias
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) { }
  /**
   * Obtiene las escuderias
   * @returns Observable
   */
  public getAll(): Observable<Array<IEscuderias>> {
    return this.http.get<Array<IEscuderias>>('http://127.0.0.1:8000/api/escuderias');
  }
  /**
   * Obtiene las escuderias ordenadas por un campo y en un sentido
   * @param  {string} campo
   * @param  {string} direct
   * @returns Observable
   */
  public getAllSort(campo: string, direct: string): Observable<Array<IEscuderias>> {

    return this.http.get<Array<IEscuderias>>('http://127.0.0.1:8000/api/escuderias/' + campo + '/' + direct);
  }
  /**
   * Obtiene una escuderia
   * @param  {} id
   * @returns Observable
   */
  public getEscuderia(id): Observable<IEscuderias> {

    return this.http.get<IEscuderias>('http://127.0.0.1:8000/api/escuderias/' + id);
  }
  /**
   * Añade la escuderia
   * @param  {IEscuderias} escuderia
   * @returns Observable
   */
  public addEscuderia(escuderia: IEscuderias): Observable<IEscuderias> {
    return this.http.post<IEscuderias>('http://127.0.0.1:8000/api/escuderias', escuderia);
  }
  /**
   * Borra la escuderia
   * @param  {string} id
   * @returns Observable
   */
  public deleteEscuderia(id: string): Observable<IEscuderias> {
    return this.http.delete<IEscuderias>('http://127.0.0.1:8000/api/escuderias/' + id);
  }
  /**
   * modifica la escuderia
   * @param  {IEscuderias} escuderia
   * @param  {string} id
   * @returns Observable
   */
  public editEscuderia(escuderia: IEscuderias, id: string): Observable<IEscuderias> {
    return this.http.put<IEscuderias>('http://127.0.0.1:8000/api/escuderias/' + id, escuderia);
  }
}
