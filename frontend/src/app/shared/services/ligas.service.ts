import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { ILigas } from '../models/ligas.model';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) {

  }
  public createLiga(liga: ILigas, user: number): Observable<ILigas> {
    liga.numParticipantes = 1;
    return this.http.post('http://127.0.0.1:8000/api/ligas', { liga: liga, usuario: user });
  }
  public getLiga(user: number): Observable<ILigas> {
    return this.http.get('http://127.0.0.1:8000/api/ligas/' + user);
  }
  public getLigas(): Observable<Array<ILigas>> {
    return this.http.get<Array<ILigas>>('http://127.0.0.1:8000/api/ligas');
  }

}
