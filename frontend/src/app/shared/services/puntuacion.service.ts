import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPuntuacion } from '../models/puntuacion.model';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private http: HttpClient) {

  }
  public getPuntuacionByUser(liga: number): Observable<Array<IPuntuacion>> {
    return this.http.post<Array<IPuntuacion>>('http://127.0.0.1:8000/api/puntuacion/', { id_usuario: liga });

  }
}
