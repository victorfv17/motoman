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
  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {


  }
  public checkLogin() {
    if (this.user) {
      //METER ESTO EN EL SERVICE PARA PODER LLAMARLO DESDE MAS SITIOS
      this.authenticationService.getUser(this.user).subscribe(usuario => {
        console.log(usuario)
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario))
          this.router.navigateByUrl('/informacion');
        }

      });
    };
  }


}
