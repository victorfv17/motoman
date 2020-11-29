import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
/**
 * Clase para el componente de registro
 */
export class RegistroComponent implements OnInit {
  public usuario: IUser = {};
  deshabilitarForm: boolean = false;
  tieneError: boolean = false;
  /**
   * Constructor para el componente de registro
   * @param  {AuthenticationService} privateauthenticationService
   * @param  {Router} privaterouter
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }
  /**
   * metodo que se ejecuta al inicio
   */
  ngOnInit() {
  }
  /**
   * Navega a la pantalla de login
   */
  back() {
    this.router.navigateByUrl('/login');
  }
  /**
   * Envia la informacion introducida sobre el usuario a registrar
   * @param  {NgForm} form //formulario con los datos a registrar
   */
  submitData(form: NgForm) {

    this.authenticationService.createUser(this.usuario).subscribe(() => {
      form.reset();
      this.deshabilitarForm = true;
      this.tieneError = false;
      this.snackbar.open('Usuario Registrado', null, {
        duration: 1000,

      })
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 1000);

    }, (error) => this.tieneError = true);

  }

}
