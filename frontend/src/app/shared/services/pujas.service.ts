import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPujas } from '../models/pujas.model';
import { IUser } from '../models/users.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PujasService {

  constructor(private http: HttpClient) { }
  public getPujas(idLiga: number): Observable<Array<IPujas>> {

    return this.http.get<Array<IPujas>>(`http://127.0.0.1:8000/api/pujas/compras/${idLiga}`);
  }
  public getPujasUsuario(idUser: number): Observable<Array<IPujas>> {

    return this.http.get<Array<IPujas>>(`http://127.0.0.1:8000/api/pujas/${idUser}`);
  }
  public guardarPuja(user: number, pujas: Array<IPujas>): Observable<any> {
    const params = {
      usuario: user,
      pujas: pujas
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/pujas', params);
  }
  public deletePujas(): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/api/pujas/borrar/todas');
  }
  public borrarPujasUsuario(usuario: number, tipo: string): Observable<any> {

    return this.http.delete<any>(`http://127.0.0.1:8000/api/pujas/${usuario}/tipo/${tipo}`);
  }
}
