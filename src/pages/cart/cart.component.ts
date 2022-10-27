import { Component, OnInit } from '@angular/core';
import { Product } from '../product-gallery/product.model';
import { CartService } from './cart.service';
import { CustomerInformation } from '../../components/product-view/product-view.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
export interface CartProduct {
  product: Product;
  customerInformation: CustomerInformation;
}

interface ProductStripeData {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: (string | undefined)[];
    };
    unit_amount: number;
  };
  quantity: number;
}

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] | undefined;
  total: number = 0;
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getAllCartProductsFromLocalStorage();
    this.cartService.updatedLocalStorage.subscribe((random) => {
      this.cartItems = this.cartService.getAllCartProductsFromLocalStorage();
    });

    this.recalculateTotal();
  }

  removeFromCart(productId: string | undefined) {
    this.cartService.removeFromCart(productId);
    this.recalculateTotal();
  }

  checkout() {
    const productDataArray: ProductStripeData[] | undefined =
      this.cartItems?.map((cartItem) => {
        let productData: ProductStripeData = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cartItem.product.title,
              images: [cartItem.product.image],
            },
            unit_amount: parseInt(`${cartItem.product.price}00`),
          },
          quantity: 1,
        };
        return productData;
      });

    this.http
      .post('http://localhost:4000/api/stripe/payment', {
        product_data_array: productDataArray,
      })
      .subscribe((response: any) => {
        console.log(response);
        this.redirectToStripeCheckout(response);
      });
  }

  async redirectToStripeCheckout(session: any) {
    const stripe = await loadStripe(environment.STRIPE_KEY);
    stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  }

  recalculateTotal() {
    let total: number = 0;
    this.cartItems?.forEach((item) => {
      total = total + item.product.price;
    });
    this.total = total;
  }
}
