import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public isCollapsed = true;
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
