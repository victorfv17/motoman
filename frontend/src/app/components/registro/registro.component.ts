import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public usuario: IUser = {};
  deshabilitarForm: boolean = false;
  tieneError: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('/login');
  }

  submitData(form: NgForm) {
    //   let cipher = CryptoJS.AES.encrypt('cifrar', CryptoJS.enc.Utf8.parse(key), {
    //     iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV 
    //     padding: CryptoJS.pad.Pkcs7,
    //     mode: CryptoJS.mode.CBC
    // });
    let key = 'base64:1+p72z3YfNFgFeU7zhpGcgvqqG3lg9Ynb1FExOAAHNM=';

    let passwordEncriptada = CryptoJS.AES.encrypt('abc123..', key).toString();
    let confirmPasswordEncriptada = CryptoJS.AES.encrypt('abc123..', key).toString();
    this.usuario.password = passwordEncriptada;
    this.usuario.c_password = confirmPasswordEncriptada;
    this.authenticationService.createUser(this.usuario).subscribe(() => {
      // form.reset();
      // this.deshabilitarForm = true;
      // this.tieneError = false;
      // this.snackbar.open('Usuario Registrado', null, {
      //   duration: 1000,

      // })
      // setTimeout(() => {
      //   this.router.navigateByUrl('/login');
      // }, 1000);

    }, (error) => this.tieneError = true);

  }

}
