import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/shared/services/ligas.service';
import { ILigas } from 'src/app/shared/models/ligas.model';
import { IUser } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liga-search',
  templateUrl: './liga-search.component.html',
  styleUrls: ['./liga-search.component.scss']
})
export class LigaSearchComponent implements OnInit {
  ligas: Array<ILigas> = [];
  user: IUser = {};
  constructor(
    private ligasService: LigasService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.getLigas();
  }
  private getLigas() {
    this.ligasService.getLigas().subscribe((ligas) => {
      ligas.forEach((element) => {
        if (element['maxParticipantes'] === element['numParticipantes']) {
          ligas.splice(ligas.indexOf(element), 1);
        }
      });

      this.ligas = ligas;

    })
  }
  public anadirUsuario(liga: ILigas) {
    this.authenticationService.updateUser(this.user, liga.id_liga, liga.numParticipantes + 1).subscribe(

    );
    this.router.navigateByUrl('/informacion');
  }

}
