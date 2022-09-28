import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/components/product-gallery/product.model';
import { ProductService } from 'src/components/product-gallery/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  allProducts!: Product[];
  postProduct!: Product;
  deletedProduct!: Product;

  postProductForm!: FormGroup;
  postButtonLoading: boolean = false;

  deleteProductForm!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    let adminAttempt = prompt('Please enter your admin key');
    if (adminAttempt !== environment.ADMIN_KEY) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }

    this.postProductForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      type: new FormControl('', [Validators.required]),
    });

    this.deleteProductForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.allProducts = products;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  postNewProduct() {
    this.postButtonLoading = true;
    this.productService
      .postNewProduct({
        title: this.postProductForm.controls['title'].value,
        description: this.postProductForm.controls['description'].value,
        image: this.postProductForm.controls['image'].value,
        type: this.postProductForm.controls['type'].value,
      })
      .subscribe(
        (product: Product) => {
          this.postProduct = product;
          this.postButtonLoading = false;
        },
        (err) => {
          console.error(err);
          this.postButtonLoading = false;
        }
      );
  }

  deleteProductFromDatabase() {
    this.productService
      .deleteProduct(this.deleteProductForm.controls['id'].value)
      .subscribe((deletedProduct: Product) => {
        this.deletedProduct = deletedProduct;
      });
  }
}
