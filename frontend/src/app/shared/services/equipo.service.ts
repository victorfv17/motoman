import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEquipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  public getEquipo(user: string, tipo?: string): Observable<Array<IEquipo>> {
    if (tipo === 'pilotos') {
      return this.http.get<Array<IEquipo>>('http://127.0.0.1:8000/api/equipo/pilotos/' + user);
    } else {
      return this.http.get<Array<IEquipo>>('http://127.0.0.1:8000/api/equipo/escuderias/' + user);
    }

  }
  public venderPiloto(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/api/equipo/' + id);
  }
  /*public storeAlineacion(): Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/api/equipo/');
  }*/
}
