import { Component, OnInit } from '@angular/core';
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
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartService
      .getProductById(this.route.snapshot.paramMap.get('id'))
      ?.subscribe((product: Product) => {
        this.product = product;
      });
  }
}
