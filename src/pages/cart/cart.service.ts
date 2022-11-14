import { Injectable } from '@angular/core';
import { ProductService } from '../product-gallery/product.service';
import { Subject } from 'rxjs';
import { CartProduct, ProductStripeData } from './cart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  updatedLocalStorage: Subject<number> = new Subject<number>();
  url: string = environment.SERVER_URL;
  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

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

  removeAllFromCart() {
    window.localStorage.clear();
  }

  checkoutToStripe(productDataArray: ProductStripeData[] | undefined) {
    return this.http.post(`${this.url}/api/stripe/payment`, {
      product_data_array: productDataArray,
    });
  }

  getCustomerInformationAfterSuccessfulTransaction(session_id: string) {
    return this.http.post(
      `${this.url}/api/stripe/payment/success?session_id=${session_id}`,
      {}
    );
  }

  sendRequestEmail(emailDetails: any) {
    return this.http.post(
      `${this.url}/api/mail/nodemailer/successful-payment`,
      emailDetails
    );
  }

  editExistingCartItemInLocalStorage(cartProduct: CartProduct) {
    const cart = this.getAllCartProductsFromLocalStorage();
    const index = cart!.findIndex(
      (item) => item.product._id === cartProduct.product._id
    );
    let editedCart = cart!.splice(index, 1)[0];
    editedCart = cartProduct;
    cart!.push(editedCart);
    this.removeAllFromCart();
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }
}
