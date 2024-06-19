import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
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
  cart: number = 0;

  foodItems = [
    {
      drinks: 'Vodka 1oz.',
      price: '$25.16',
      description: 'VODKA and choice of juice or soda.',
    },
    {
      drinks: 'Rum 1oz.',
      price: '$22.35',
      description: 'RUM and choice of juice or soda.',
    },
    {
      drinks: 'Whisky 1oz.',
      price: '$19.25',
      description: 'Whisky and choice of juice or soda',
    },
    {
      drinks: 'Tequila 1oz.',
      price: '$35',
      description: 'Tequila served with juice or soda.',
    },
    {
      drinks: 'Red wine.',
      price: '$8.75',
      description: '8oz Red wine, ask server for our wine selection.',
    },
    {
      drinks: 'White wine.',
      price: '$23.14',
      description: '8oz white wine, ask server for our wine selection.',
    },
    {
      drinks: 'Sparkling wine .',
      price: '$35.12',
      description: '8oz sparking wine glass of your choice.',
    },
    {
      drinks: 'Domestic and foreign beer .',
      price: '$50.6',
      description: 'Domestic and foreign beer of you choice',
    },
  ];
  
  addItem() {
    this.cart = this.cart + 1;
  }
}
