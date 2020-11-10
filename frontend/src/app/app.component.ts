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
export class AppComponent implements OnInit {
  title = 'frontend';
  public user: any;
  public isCollapsed = true;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('usuario'));


    // if (this.user) {
    //   this.authenticationService.loadUser(this.user.usuario.id).subscribe((usuario) => {

    //     localStorage.setItem('usuario', JSON.stringify({ access_token: this.user, usuario: usuario }))
    //     console.log('obtenido', usuario);
    //   });
    // }


  }
  ngDoCheck(): void {
    this.user = localStorage.getItem('usuario');
  }
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;

  }
  logout() {
    localStorage.clear();
  }

  checkVisibility(): boolean {
    if (this.location.path().includes('liga')) {
      return false;
    } else {
      return true;
    }
  }


}
