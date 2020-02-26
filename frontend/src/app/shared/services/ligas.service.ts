import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILigas } from '../models/ligas.model';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(private http: HttpClient) { }
  public createLiga(liga: ILigas): Observable<ILigas> {
    return this.http.post('http://127.0.0.1:8000/api/ligas', liga);
  }

}
