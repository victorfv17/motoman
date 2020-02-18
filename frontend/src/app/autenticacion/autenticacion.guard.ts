import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(private auth: AuthenticationService,
    private router: Router) {
    console.log('ahjsdfklasdjf')
  }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    console.log('entro')
    return true;
  }

}
