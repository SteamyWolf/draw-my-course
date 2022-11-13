import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CartProduct } from 'src/pages/cart/cart.component';
import { CartService } from 'src/pages/cart/cart.service';
import { Product } from 'src/pages/product-gallery/product.model';

export interface CustomerInformation {
  name: string;
  main: string;
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
  editMode: boolean = false;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.editMode = params.edit;
      if (params.edit) {
        this.route.url.subscribe((url: any) => {
          const productId = url[1].path;
          const cart = this.cartService.getAllCartProductsFromLocalStorage();
          const currentCartItem = cart?.filter(
            (item) => item.product._id === productId
          )[0];
          this.form = new FormGroup({
            name: new FormControl(currentCartItem?.customerInformation.name),
            main: new FormControl(currentCartItem?.customerInformation.main),
            course: new FormControl(
              currentCartItem?.customerInformation.course
            ),
            hole: new FormControl(currentCartItem?.customerInformation.hole),
            notes: new FormControl(currentCartItem?.customerInformation.notes),
          });
        });
      } else {
        this.form = new FormGroup({
          name: new FormControl('', [Validators.required]),
          main: new FormControl('', [Validators.required]),
          course: new FormControl('', [Validators.required]),
          hole: new FormControl(''),
          notes: new FormControl(''),
        });
      }
    });
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
      main: form.controls['main'].value,
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

      let message;
      if (this.editMode) {
        message = 'Cart Item Edited';
        this.cartService.editExistingCartItemInLocalStorage(cartProduct);
      } else {
        message = 'Added to Cart';
        this.cartService.addItemToCartLocalStorage(cartProduct);
      }
      this.openSnackBar(message);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
