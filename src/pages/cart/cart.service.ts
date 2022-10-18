import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product-gallery/product.model';
import { ProductService } from '../product-gallery/product.service';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  updatedLocalStorage: Subject<number> = new Subject<number>();
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  getProductById(id: string | null) {
    if (!id) return;
    return this.productService.getOneProduct(id);
  }

  addItemToCartLocalStorage(productId: string | undefined) {
    if (!productId) return;
    if (window.localStorage.getItem('cart')) {
      const localCart = window.localStorage.getItem('cart');
      if (!localCart) return;
      const parsed: string[] = JSON.parse(localCart);
      parsed.push(productId);
      window.localStorage.setItem('cart', JSON.stringify(parsed));
    } else {
      window.localStorage.setItem('cart', JSON.stringify([productId]));
    }
  }

  async getAllCartProductsFromServer() {
    if (!window.localStorage.getItem('cart')) return;
    const localCart = window.localStorage.getItem('cart');
    if (!localCart) return;
    const parsed: string[] = JSON.parse(localCart);
    const products = parsed.map(async (productId) => {
      return await firstValueFrom(this.productService.getOneProduct(productId));
    });
    let resolved = await Promise.all(products).then((products) => products);
    return resolved;
  }

  removeFromCart(productId: string | undefined) {
    const localCart = window.localStorage.getItem('cart');
    if (!localCart) return;
    const parsed: string[] = JSON.parse(localCart);
    const filtered = parsed.filter((id) => id !== productId);
    window.localStorage.setItem('cart', JSON.stringify(filtered));
    this.updatedLocalStorage.next(Math.random());
  }
}
