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
export class AuthenticationService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "Accept": "application/json" });
  }
  public getUser(user: IUser): Observable<IUser> {

    return this.http.post('http://127.0.0.1:8000/api/user/login',
      { email: user.email, password: user.password },
      { headers: this.headers })
      .pipe(map(datos => { return datos }));
  }
  public isAuthenticated(): IUser {

    //this.authenticationService.isAuthenticated().subscribe(data => console.log(data))
    const user = JSON.parse(localStorage.getItem('usuario'))
    if (!user) return;

    return user;

  }
  public getUsersByLiga(liga: ILigas): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>('http://127.0.0.1:8000/api/user/' + liga);
  }
  public createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://127.0.0.1:8000/api/user/create', user)
      .pipe(map(datos => { return datos }));
  }
  public updateUser(user: IUser, liga: number, participantes?: number, saldo?: number): Observable<IUser> {
    return this.http.put<IUser>('http://127.0.0.1:8000/api/user/update', { id: user.usuario.id, liga_id: liga, numParticipantes: participantes, saldo: user.usuario.saldo })
      .pipe(map(datos => { return datos }));
  }

  public loadUser(idUser: number): Observable<any> {
    return this.http.get<IUser>('http://127.0.0.1:8000/api/user/saldo/' + idUser);
  }
}
