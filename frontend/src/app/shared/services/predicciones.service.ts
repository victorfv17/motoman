import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrediccion } from '../models/prediccion.model';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de apuestas
 */
export class PrediccionesService {
  /**
   * Constructor para el servicio de apuestas
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) { }
  /**
   * Añade la apuesta del usuario
   * @param  {any} prediccion
   * @param  {any} user
   * @returns Observable
   */
  public addPrediccion(prediccion: any, user: any): Observable<any> {
    const params = {
      usuario: user,
      prediccion: prediccion
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/predicciones', params);
  }
  /**
   * Actualiza la apuesta del usuario
   * @param  {any} prediccion
   * @param  {any} user
   * @returns Observable
   */
  public updatePrediccion(prediccion: any, user: any): Observable<any> {
    const params = {
      usuario: user,
      prediccion: prediccion
    }
    return this.http.put(`http://127.0.0.1:8000/api/predicciones`, params);
  }
  /**
   * Obtiene las apuestas del usuario
   * @param  {IUser} user
   * @returns Observable
   */
  public getPredicciones(user: IUser): Observable<any> {

    return this.http.get(`http://127.0.0.1:8000/api/predicciones/${user.id}`);
  }
}
