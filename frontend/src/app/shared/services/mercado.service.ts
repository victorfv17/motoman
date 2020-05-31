import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMercado } from '../models/mercado.model';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  constructor(private http:HttpClient) { }

  public getPilotosMercado(): Observable<IMercado> {
    return this.http.get('http://127.0.0.1:8000/api/mercado');
  }
}
