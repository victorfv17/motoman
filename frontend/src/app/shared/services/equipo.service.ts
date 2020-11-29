import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEquipo } from '../models/equipo.model';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de equipo
 */
export class EquipoService {
  /**
   * Constructor para el servicio de equipo
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los pilotos o escuderías del equipo del usuario 
   * @param  {string} user
   * @param  {string} tipo?
   * @returns Observable
   */
  public getEquipo(user: string, tipo?: string): Observable<Array<IEquipo>> {
    if (tipo === 'primerPiloto' || tipo === 'segundoPiloto' || tipo === 'pilotos') {
      return this.http.get<Array<IEquipo>>('http://127.0.0.1:8000/api/equipo/pilotos/' + user);
    } else {
      return this.http.get<Array<IEquipo>>('http://127.0.0.1:8000/api/equipo/escuderias/' + user);
    }

  }
  /**
   * Obtiene las ventas del equipo del usuario
   * @param  {number} idLiga
   * @returns Observable
   */
  public getVentas(idLiga: number): Observable<Array<IEquipo>> {

    return this.http.get<Array<IEquipo>>(`http://127.0.0.1:8000/api/equipo/ventas/${idLiga}`);

  }
  /**
   * Borra un piloto o escuderia del equipo para realizar la venta
   * @param  {number} id
   * @returns Observable
   */
  public venta(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/api/equipo/' + id);
  }
  /**
   * Guarda la alineacion del usuario
   * @param  {number} usuario
   * @param  {any} equipo
   * @returns Observable
   */
  public storeAlineacion(usuario: number, equipo: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/equipo', { usuario: usuario, equipo: equipo });
  }
  /**
   * Obtiene la alineacion del usuario
   * @param  {number} userId
   * @returns Observable
   */
  public getAlineacion(userId: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/equipo/detalle/alineacion/' + userId);
  }
}
