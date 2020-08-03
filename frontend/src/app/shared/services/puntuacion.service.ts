import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPuntuacion } from '../models/puntuacion.model';
;

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private http: HttpClient) {

  }
  public getPuntuacionByUser(liga: number, campoOrdenacion): Observable<Array<IPuntuacion>> {
    return this.http.get<Array<IPuntuacion>>('http://127.0.0.1:8000/api/clasificacion/join/' + liga + '/' + campoOrdenacion);

  }
  public addPuntosPiloto(puntuaciones: Array<any>): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/clasificacion', puntuaciones);

  }

}
