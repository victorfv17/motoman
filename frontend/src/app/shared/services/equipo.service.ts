import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEquipo } from '../models/equipo.model';
import { IUser } from '../models/users.model';

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
  public getVentas(idLiga: number): Observable<Array<IEquipo>> {

    return this.http.get<Array<IEquipo>>(`http://127.0.0.1:8000/api/equipo/ventas/${idLiga}`);

  }

  public venta(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/api/equipo/' + id);
  }
  public storeAlineacion(usuario: number, equipo: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/equipo', { usuario: usuario, equipo: equipo });
  }
  public getAlineacion(userId: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/equipo/detalle/alineacion/' + userId);
  }
}
