import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "Accept": "application/json" });
  }
  public getUser(user: IUser): Observable<IUser> {

    return this.http.post('http://127.0.0.1:8000/api/user/login', { email: user.email, password: user.password }, { headers: this.headers })
      .pipe(map(datos => { return datos }));
  }
  public isAuthenticated(): IUser {

    //this.authenticationService.isAuthenticated().subscribe(data => console.log(data))
    const user = JSON.parse(localStorage.getItem('usuario'))
    if (!user) return;

    return user;

  }
}
