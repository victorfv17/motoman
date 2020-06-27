import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMercado } from '../models/mercado.model';
import { IUser } from '../models/users.model';
import { ILigas } from '../models/ligas.model';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(private http: HttpClient) { }

  public getPilotosMercado(): Observable<Array<IMercado>> {
    return this.http.get<Array<IMercado>>('http://127.0.0.1:8000/api/mercadoPilotos');
  }
  public savePilotosMercado(liga: number): Observable<IMercado> {
    return this.http.post('http://127.0.0.1:8000/api/mercadoPilotos', { liga_id: liga });
  }

}
