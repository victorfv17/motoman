import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public usuario: IUser = {};
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('/login');
  }

  submitData() {

    this.authenticationService.createUser(this.usuario).subscribe(
    );
    this.router.navigateByUrl('/login');
  }

}
