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

  public getPilotosMercado(usuario: IUser): Observable<Array<IMercado>> {
    return this.http.get<Array<IMercado>>(`http://127.0.0.1:8000/api/mercadoPilotos/${usuario.liga_id}/${usuario.id}`);
  }
  public savePilotosMercado(liga: number): Observable<IMercado> {
    return this.http.post('http://127.0.0.1:8000/api/mercadoPilotos', { liga_id: liga });
  }
  public deletePilotosMercado(liga: number): Observable<IMercado> {
    return this.http.delete('http://127.0.0.1:8000/api/mercadoPilotos/' + liga);
  }
  public getEscuderiasMercado(usuario: IUser): Observable<Array<IMercado>> {
    return this.http.get<Array<IMercado>>(`http://127.0.0.1:8000/api/mercadoEscuderias/${usuario.liga_id}/${usuario.id}`);
  }
  public saveEscuderiasMercado(liga: number): Observable<IMercado> {
    return this.http.post('http://127.0.0.1:8000/api/mercadoEscuderias', { liga_id: liga });
  }
  public deleteEscuderiasMercado(liga: number): Observable<IMercado> {
    return this.http.delete('http://127.0.0.1:8000/api/mercadoEscuderias/' + liga);
  }

}
