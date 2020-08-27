import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrediccion } from '../models/prediccion.model';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class PrediccionesService {

  constructor(private http: HttpClient) { }
  public addPrediccion(prediccion: any, user: any): Observable<any> {
    const params = {
      usuario: user,
      prediccion: prediccion
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/predicciones', params);
  }
  public updatePrediccion(prediccion: any, user: any): Observable<any> {
    const params = {
      usuario: user,
      prediccion: prediccion
    }
    return this.http.put(`http://127.0.0.1:8000/api/predicciones`, params);
  }
  public getPredicciones(user: IUser): Observable<any> {

    return this.http.get(`http://127.0.0.1:8000/api/predicciones/${user.id}`);
  }
}
