import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/users.model';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public user: IUser = {};
  public usuario: string;
  public tieneError: boolean = false;
  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');

  }
  public checkLogin() {
    if (this.user) {

      this.authenticationService.getUser(this.user).subscribe(usuario => {
        if (usuario) {
          this.tieneError = false;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.navigate(usuario);
        }

      }, (error) => this.tieneError = true);
    };
  }
  private navigate(usuario: IUser) {
    console.log('usuario', usuario);
    if (usuario.usuario.liga_id) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/liga');
    }
  }


}
