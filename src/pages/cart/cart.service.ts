import { Injectable } from '@angular/core';
import { ProductService } from '../product-gallery/product.service';
import { Subject } from 'rxjs';
import { CartProduct } from './cart.component';

@Injectable({ providedIn: 'root' })
export class CartService {
  updatedLocalStorage: Subject<number> = new Subject<number>();
  constructor(private productService: ProductService) {}

  getProductById(id: string | null) {
    if (!id) return;
    return this.productService.getOneProduct(id);
  }

  addItemToCartLocalStorage(cartProduct: CartProduct) {
    if (!cartProduct) return;
    if (window.localStorage.getItem('cart')) {
      const localCart = window.localStorage.getItem('cart');
      if (!localCart) return;
      const parsed: CartProduct[] = JSON.parse(localCart);
      parsed.push(cartProduct);
      window.localStorage.setItem('cart', JSON.stringify(parsed));
    } else {
      window.localStorage.setItem('cart', JSON.stringify([cartProduct]));
    }
  }

  getAllCartProductsFromLocalStorage() {
    if (!window.localStorage.getItem('cart')) return;
    const localCart = window.localStorage.getItem('cart');
    if (!localCart) return;
    const parsed: CartProduct[] = JSON.parse(localCart);
    return parsed;
  }

  removeFromCart(productId: string | undefined) {
    const localCart = window.localStorage.getItem('cart');
    if (!localCart) return;
    const parsed: CartProduct[] = JSON.parse(localCart);
    const filtered = parsed.filter(
      (cartProduct) => cartProduct.product._id !== productId
    );
    window.localStorage.setItem('cart', JSON.stringify(filtered));
    this.updatedLocalStorage.next(Math.random());
  }
}
