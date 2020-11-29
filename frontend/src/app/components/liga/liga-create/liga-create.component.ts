import { Component, OnInit } from '@angular/core';
import { ILigas } from 'src/app/shared/models/ligas.model';
import { LigasService } from 'src/app/shared/services/ligas.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IUser } from 'src/app/shared/models/users.model';
import { ignoreElements } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-liga-create',
  templateUrl: './liga-create.component.html',
  styleUrls: ['./liga-create.component.scss']
})
/**
 * Clase para el componente de crear liga
 */
export class LigaCreateComponent implements OnInit {
  public isLoading: boolean = false;
  public liga: ILigas = {};
  public user: IUser;
  /**
   * Constructor para el componente de crear liga
   * @param  {LigasService} privateligasService
   * @param  {AuthenticationService} privateauthenticationService
   * @param  {Router} privaterouter
   * @param  {Location} privatelocation
   */
  constructor(
    private ligasService: LigasService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }
  /**
   * Envia la informacion para crear la liga y añadir el usuario a esa liga
   * Tambien actualiza la informacion del usuario guardada en la storage para asignarlo a esa liga
   * @returns void
   */
  public create(): void {
    this.ligasService.createLiga(this.liga, this.user.usuario.id).subscribe((data) => {
      this.authenticationService.updateUser(this.user, data.id, 1).subscribe((user) => {
        if (!user) return;
        this.user = user;
        let item = JSON.parse(localStorage.getItem('usuario'));

        const usuario = {
          access_token: item.access_token,
          usuario: this.user
        }
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigateByUrl('/');
      });
    });

  }
  /**
   * Navega a la anterior pantalla
   */
  back() {
    this.location.back();
  }

}
