import { Component, OnInit } from '@angular/core';
import { Product } from '../product-gallery/product.model';
import { CartService } from './cart.service';
import { CustomerInformation } from '../../components/product-view/product-view.component';
export interface CartProduct {
  product: Product;
  customerInformation: CustomerInformation;
}

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] | undefined;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getAllCartProductsFromLocalStorage();
    console.log(this.cartItems);
    this.cartService.updatedLocalStorage.subscribe((random) => {
      this.cartItems = this.cartService.getAllCartProductsFromLocalStorage();
    });
  }

  removeFromCart(productId: string | undefined) {
    this.cartService.removeFromCart(productId);
  }
}
