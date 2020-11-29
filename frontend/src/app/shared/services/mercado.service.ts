import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMercado } from '../models/mercado.model';
import { IUser } from '../models/users.model';
import { ILigas } from '../models/ligas.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de mercado
 */
export class MercadoService {
  /**
   * Constructor para el servicio de mercado
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) { }
  /**
   * Obtiene los pilotos del mercado de la liga correspondiente
   * @param  {IUser} usuario
   * @returns Observable
   */
  public getPilotosMercado(usuario: IUser): Observable<Array<IMercado>> {
    return this.http.get<Array<IMercado>>(`http://127.0.0.1:8000/api/mercadoPilotos/${usuario.liga_id}/${usuario.id}`);
  }
  /**
   * Añade los pilotos del mercado
   * @param  {number} liga
   * @returns Observable
   */
  public savePilotosMercado(liga: number): Observable<IMercado> {
    return this.http.post('http://127.0.0.1:8000/api/mercadoPilotos', { liga_id: liga });
  }
  /**
   * Borra los pilotos del mercado
   * @param  {number} liga
   * @returns Observable
   */
  public deletePilotosMercado(liga: number): Observable<IMercado> {
    return this.http.delete('http://127.0.0.1:8000/api/mercadoPilotos/' + liga);
  }
  /**
   * Obtiene las escuderias del mercado de la liga correspondiente
   * @param  {IUser} usuario
   * @returns Observable
   */
  public getEscuderiasMercado(usuario: IUser): Observable<Array<IMercado>> {
    return this.http.get<Array<IMercado>>(`http://127.0.0.1:8000/api/mercadoEscuderias/${usuario.liga_id}/${usuario.id}`);
  }
  /**
   * Añade las escuderias al mercado
   * @param  {number} liga
   * @returns Observable
   */
  public saveEscuderiasMercado(liga: number): Observable<IMercado> {
    return this.http.post('http://127.0.0.1:8000/api/mercadoEscuderias', { liga_id: liga });
  }
  /**
   * Borra las escuderias del mercado
   * @param  {number} liga
   * @returns Observable
   */
  public deleteEscuderiasMercado(liga: number): Observable<IMercado> {
    return this.http.delete('http://127.0.0.1:8000/api/mercadoEscuderias/' + liga);
  }

}
