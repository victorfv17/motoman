import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/users.model';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Clase para el componente de login
 */
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public user: IUser = {};
  public usuario: string;
  public tieneError: boolean = false;
  /**
   * Constructor para el componente de login
   * @param  {AuthenticationService} privateauthenticationService
   * @param  {Router} privaterouter
   */
  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');

  }
  /**
   * Envia la informacion introducida por el usuario para comprobar que es correcta
   */
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


  /**
   * Navega a la pantalla de inicio de liga o a la pantalla de liga dependiendo de si el usuario pertenece a una liga
   * @param  {IUser} usuario //usuario a comprobar 
   */
  private navigate(usuario: IUser) {
    if (usuario.usuario.liga_id) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/liga');
    }
  }


}
