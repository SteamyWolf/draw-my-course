import { Component } from '@angular/core';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor() {}

  checkCartAmount() {
    if (!window.localStorage.getItem('cart')) return '';
    const localCart = window.localStorage.getItem('cart');
    if (!localCart) return '';
    const parsed: string[] = JSON.parse(localCart);
    return parsed.length;
  }
}
