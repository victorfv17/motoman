import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPilotos } from '../models/pilotos.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de pilotos
 */
export class PilotosService {
  /**
   * Constructor para el servicio de pilotos
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) {

  }
  /**
   * Obtiene los pilotos
   * @returns Observable
   */
  public getAll(): Observable<Array<IPilotos>> {

    return this.http.get<Array<IPilotos>>('http://127.0.0.1:8000/api/pilotos');
  }
  /**
   * Obtiene los pilotos ordenados por un campo y en un sentido
   * @param  {string} campo
   * @param  {string} direct
   * @returns Observable
   */
  public getAllSort(campo: string, direct: string): Observable<Array<IPilotos>> {

    return this.http.get<Array<IPilotos>>('http://127.0.0.1:8000/api/pilotos/' + campo + '/' + direct);
  }
  /**
   * Obtiene un piloto
   * @param  {number} id
   * @returns Observable
   */
  public getPiloto(id: number): Observable<IPilotos> {
    return this.http.get<IPilotos>('http://127.0.0.1:8000/api/pilotos/' + id);
  }
  /**
   * Añade el piloto
   * @param  {IPilotos} piloto
   * @returns Observable
   */
  public addPiloto(piloto: IPilotos): Observable<IPilotos> {
    return this.http.post<IPilotos>('http://127.0.0.1:8000/api/pilotos', piloto);
  }
  /**
   * Borra el piloto
   * @param  {string} id
   * @returns Observable
   */
  public deletePiloto(id: string): Observable<IPilotos> {
    return this.http.delete<IPilotos>('http://127.0.0.1:8000/api/pilotos/' + id);
  }
  /**
   * Modifica el piloto
   * @param  {IPilotos} piloto
   * @param  {string} id
   * @returns Observable
   */
  public editPiloto(piloto: IPilotos, id: string): Observable<IPilotos> {
    return this.http.put<IPilotos>('http://127.0.0.1:8000/api/pilotos/' + id, piloto);
  }
}