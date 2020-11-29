import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ILigas } from '../models/ligas.model';
@Injectable({
  providedIn: 'root'
})
/**
 * Clase para el servicio de autenticacion
 */
export class AuthenticationService {
  headers: HttpHeaders;
  /**
   * Constructor para el servicio de autenticacion
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "Accept": "application/json" });
  }
  /**
   * Envia la informacion para comprobar el login
   * @param  {IUser} user
   * @returns Observable
   */
  public getUser(user: IUser): Observable<IUser> {

    return this.http.post('http://127.0.0.1:8000/api/user/login',
      { email: user.email, password: user.password },
      { headers: this.headers })
      .pipe(map(datos => { return datos }));
  }
  /**
   * Comprueba si esta autenticado
   * @returns IUser
   */
  public isAuthenticated(): IUser {
    const user = JSON.parse(localStorage.getItem('usuario'))
    if (!user) return;

    return user;

  }
  /**
   * Obtiene los usuarios de la liga
   * @param  {ILigas} liga
   * @returns Observable
   */
  public getUsersByLiga(liga: ILigas): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('http://127.0.0.1:8000/api/user/' + liga);
  }
  /**
   * Crea el usuario
   * @param  {IUser} user
   * @returns Observable
   */
  public createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://127.0.0.1:8000/api/user/create', user)
      .pipe(map(datos => { return datos }));
  }
  /**
   * Actualiza la informacion del usuario
   * @param  {IUser} user
   * @param  {number} liga
   * @param  {number} participantes?
   * @param  {number} saldo?
   * @returns Observable
   */
  public updateUser(user: IUser, liga: number, participantes?: number, saldo?: number): Observable<IUser> {
    return this.http.put<IUser>('http://127.0.0.1:8000/api/user/update', { id: user.usuario.id, liga_id: liga, numParticipantes: participantes, saldo: user.usuario.saldo })
      .pipe(map(datos => { return datos }));
  }
  /**
   * Obtiene el usuario
   * @param  {number} idUser
   * @returns Observable
   */
  public loadUser(idUser: number): Observable<any> {
    return this.http.get<IUser>('http://127.0.0.1:8000/api/user/saldo/' + idUser);
  }
}
