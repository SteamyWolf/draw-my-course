import { Component, OnInit } from '@angular/core';
import { Product } from '../product-gallery/product.model';
import { CartService } from './cart.service';
import { CustomerInformation } from '../../components/product-view/product-view.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
export interface CartProduct {
  product: Product;
  customerInformation: CustomerInformation;
}

export interface ProductStripeData {
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
  hoverState: boolean = false;
  cartItems: CartProduct[] | undefined;
  total: number = 0;
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

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
          quantity: cartItem.product.quantity,
        };
        return productData;
      });

    this.cartService
      .checkoutToStripe(productDataArray)
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
      total = total + (item.product.price * item.product.quantity); //prettier-ignore
    });
    this.total = total;
  }

  quantityChange(event: any, cartItem: CartProduct) {
    const index = this.cartItems!.findIndex(
      (item) => item.product._id === cartItem.product._id
    );
    let foundItem = this.cartItems!.find(
      (item) => item.product._id === cartItem.product._id
    );
    foundItem!.product.quantity = event.target.valueAsNumber;
    this.cartItems?.splice(index, 1, foundItem!);
    this.recalculateTotal();
  }

  editCartItem(id: string | undefined) {
    this.router.navigate(['product', id], { queryParams: { edit: true } });
  }

  onHover() {
    this.hoverState = !this.hoverState;
  }
}
