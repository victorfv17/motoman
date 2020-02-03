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
  public getPiloto(id: number): Observable<IPilotos> {
    return this.http.get<IPilotos>('http://127.0.0.1:8000/api/pilotos/' + id);
  }

  columnSorted(campo: string, datalist: any[], direction: string): any[] {

    if (direction === 'asc') {
      datalist.sort(function (a, b) {
        if (a[campo] > b[campo]) {
          return 1;
        }
        if (a[campo] < b[campo]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    } else {
      datalist.sort(function (b, a) {
        if (a[campo] > b[campo]) {
          return 1;
        }
        if (a[campo] < b[campo]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    return datalist;
  }

}
