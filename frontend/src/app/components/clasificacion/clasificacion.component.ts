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


    this.puntuacionService.getPuntuacionByUser(this.user.usuario.liga_id).subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios)
    });

  }

}
