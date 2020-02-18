import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public isCollapsed = true;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    //this.authenticationService.getUser()
    console.log(localStorage.getItem('token'));

  }
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }


}
