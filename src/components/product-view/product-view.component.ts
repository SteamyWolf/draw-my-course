import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/pages/cart/cart.component';
import { CartService } from 'src/pages/cart/cart.service';
import { Product } from 'src/pages/product-gallery/product.model';

export interface CustomerInformation {
  name: string;
  course: string;
  hole: string;
  notes: string;
}

@Component({
  selector: 'product-view-component',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  product?: Product;
  form!: FormGroup;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartService
      .getProductById(this.route.snapshot.paramMap.get('id'))
      ?.subscribe(
        (product: Product) => {
          this.product = product;
        },
        (err) => {
          console.error(err);
        }
      );

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      hole: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  alreadyAddedToCart() {
    if (!window.localStorage.getItem('cart')) return false;
    const localCart = window.localStorage.getItem('cart');
    if (localCart) {
      const parsed: CartProduct[] = JSON.parse(localCart);
      if (!this.product?._id) return false;
      if (
        parsed.find(
          (cartProduct) => cartProduct.product._id === this.product?._id
        )
      ) {
        return true;
      }
    }
    return false;
  }

  submitFormAndAddToCart(form: FormGroup) {
    let customerInformation: CustomerInformation = {
      name: form.controls['name'].value,
      course: form.controls['course'].value,
      hole: form.controls['hole'].value,
      notes: form.controls['notes'].value,
    };

    let cartProduct: CartProduct;
    if (this.product?._id) {
      cartProduct = {
        customerInformation,
        product: this.product,
      };
      this.cartService.addItemToCartLocalStorage(cartProduct);
    }
  }
}
