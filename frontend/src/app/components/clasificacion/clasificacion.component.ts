import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/shared/services/ligas.service';
import { IUser } from 'src/app/shared/models/users.model';
import { ILigas } from 'src/app/shared/models/ligas.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PuntuacionService } from 'src/app/shared/services/puntuacion.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss']
})
export class ClasificacionComponent implements OnInit {
  public user: IUser;
  public users: Array<IUser> = [];
  public liga: ILigas;
  public usuarios: Array<any> = [];
  constructor(
    private ligasService: LigasService,
    private authenticationService: AuthenticationService,
    private puntuacionService: PuntuacionService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));

    this.ligasService.getLiga(this.user.usuario.liga_id).subscribe((liga) => {
      if (!liga) return;
      this.liga = liga;
      this.puntuacionService.getPuntuacionByUser(this.liga[0].id_liga).subscribe(data => {
        this.usuarios = data;
        console.log(this.usuarios)
      });
      /* this.authenticationService.getUsersByLiga(this.liga[0].id_liga).subscribe(usuarios => {
         if (usuarios.length === 0) return;
         this.users = usuarios;*/



    })



  }

}
