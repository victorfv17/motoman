import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEquipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  public getEquipo(user: string): Observable<Array<IEquipo>> {
    return this.http.get<Array<IEquipo>>('http://127.0.0.1:8000/api/equipo/' + user);
  }
}
