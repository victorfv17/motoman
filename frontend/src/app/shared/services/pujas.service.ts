import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPujas } from '../models/pujas.model';
import { IUser } from '../models/users.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de pujas
 */
export class PujasService {
  /**
   * Constructor para el servicio de pujas
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) { }
  /**
   * Obtiene las pujas de la liga
   * @param  {number} idLiga
   * @returns Observable
   */
  public getPujas(idLiga: number): Observable<Array<IPujas>> {

    return this.http.get<Array<IPujas>>(`http://127.0.0.1:8000/api/pujas/compras/${idLiga}`);
  }
  /**
   * Obtiene las pujas del usuario
   * @param  {number} idUser
   * @returns Observable
   */
  public getPujasUsuario(idUser: number): Observable<Array<IPujas>> {

    return this.http.get<Array<IPujas>>(`http://127.0.0.1:8000/api/pujas/${idUser}`);
  }
  /**
   * Añade las pujas del usuario
   * @param  {number} user
   * @param  {Array<IPujas>} pujas
   * @returns Observable
   */
  public guardarPuja(user: number, pujas: Array<IPujas>): Observable<any> {
    const params = {
      usuario: user,
      pujas: pujas
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/pujas', params);
  }
  /**
   * Borra las pujas
   * @returns Observable
   */
  public deletePujas(): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/api/pujas/borrar/todas');
  }
  /**
   * Borra las pujas del usuario
   * @param  {number} usuario
   * @param  {string} tipo
   * @returns Observable
   */
  public borrarPujasUsuario(usuario: number, tipo: string): Observable<any> {

    return this.http.delete<any>(`http://127.0.0.1:8000/api/pujas/${usuario}/tipo/${tipo}`);
  }
}
