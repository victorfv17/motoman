import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPilotos } from '../models/pilotos.model';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  constructor(private http: HttpClient) {

  }
  public getAll(): Observable<Array<IPilotos>> {
    return this.http.get<Array<IPilotos>>('http://127.0.0.1:8000/api/pilotos');
  }
}
