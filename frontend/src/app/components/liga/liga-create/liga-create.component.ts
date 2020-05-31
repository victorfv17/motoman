import { Component, OnInit } from '@angular/core';
import { ILigas } from 'src/app/shared/models/ligas.model';
import { LigasService } from 'src/app/shared/services/ligas.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IUser } from 'src/app/shared/models/users.model';
import { ignoreElements } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liga-create',
  templateUrl: './liga-create.component.html',
  styleUrls: ['./liga-create.component.scss']
})
export class LigaCreateComponent implements OnInit {
  public isLoading: boolean = false;
  public liga: ILigas = {};
  public user: IUser;
  constructor(
    private ligasService: LigasService, 
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }
  public create(): void {
    this.ligasService.createLiga(this.liga).subscribe((data) => {
      console.log(data.id)
      this.authenticationService.updateUser(this.user, data.id).subscribe((user) => {
        if (!user) return;
        this.user = user;
        console.log(this.user)
        //localStorage.clear();
        let item = JSON.parse(localStorage.getItem('usuario'));

        const usuario = {
          access_token: item.access_token,
          usuario: this.user
        }
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigateByUrl('/clasificacion');
        // localStorage.setItem('usuario'['usuario']['liga_id'], JSON.stringify(this.user.liga_id));
      });
    });

  }

}
