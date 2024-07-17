import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  hideOnLogin: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideOnLogin = event.url !== '/login';
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
