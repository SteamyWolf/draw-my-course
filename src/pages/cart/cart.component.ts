import { Component, OnInit } from '@angular/core';
import { Product } from '../product-gallery/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] | undefined;
  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.cartItems = await this.cartService.getAllCartProductsFromServer();
    console.log(this.cartItems);
    this.cartService.updatedLocalStorage.subscribe(async (random) => {
      this.cartItems = await this.cartService.getAllCartProductsFromServer();
    });
  }

  removeFromCart(productId: string | undefined) {
    this.cartService.removeFromCart(productId);
  }
}
