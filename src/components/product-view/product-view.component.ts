import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/pages/cart/cart.service';
import { Product } from 'src/pages/product-gallery/product.model';

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
    });
  }

  alreadyAddedToCart() {
    if (!window.localStorage.getItem('cart')) return false;
    const localCart = window.localStorage.getItem('cart');
    if (localCart) {
      const parsed: string[] = JSON.parse(localCart);
      if (!this.product?._id) return false;
      if (parsed.includes(this.product?._id)) {
        return true;
      }
    }
    return false;
  }

  submitFormAndAddToCart(form: FormGroup) {
    this.cartService.addItemToCartLocalStorage(this.product?._id);
    console.log(form.controls);
  }
}
