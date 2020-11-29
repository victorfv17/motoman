import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { IUser } from './shared/models/users.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Clase para el componente principal
 */
export class AppComponent implements OnInit {
  title = 'frontend';
  public user: any;
  public isCollapsed = true;
  /**
   * Constructor para el componente principal
   * @param  {ActivatedRoute} privateroute
   * @param  {Location} privatelocation
   * @param  {AuthenticationService} privateauthenticationService
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService
  ) { }
  /**
   * Metodo que se ejecuta al inicio y obtiene el usuario de la storage
   */
  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('usuario'));
  }
  /**
   * Vuelve a obtener el usuario de la storage 
   * @returns void
   */
  ngDoCheck(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }
  /**
   * Colapsa y descolapsa secciones del menu
   */
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;

  }
  /**
   * Cierra sesion del usuario y limpia la informacion
   */
  logout() {
    localStorage.clear();
  }
  /**
   * Hace visibles o invisibles ciertas pantallas
   * @returns boolean
   */
  checkVisibility(): boolean {
    if (this.location.path().includes('liga')) {
      return false;
    } else {
      return true;
    }
  }


}
