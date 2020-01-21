import { Injectable } from '@angular/core';
import { IEscuderias } from '../models/escuderias.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscuderiasService {

  constructor(private http: HttpClient) { }
  public getAll(): Observable<Array<IEscuderias>> {
    return this.http.get<Array<IEscuderias>>('http://127.0.0.1:8000/api/escuderias');
  }
  public getEscuderia(id): Observable<IEscuderias> {

    return this.http.get<IEscuderias>('http://127.0.0.1:8000/api/escuderias/' + id);
  }
}
