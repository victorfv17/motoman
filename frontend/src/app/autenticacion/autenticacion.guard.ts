import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase para la autenticacion
 */
export class AutenticacionGuard implements CanActivate {
  public user: any;
  /**
   * Constructor para la autenticación
   * @param  {AuthenticationService} privateauth
   * @param  {Router} privaterouter
   */
  constructor(private auth: AuthenticationService,
    private router: Router) {

  }
  /**
   * Comprueba si esta autenticado
   * @returns boolean
   */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
