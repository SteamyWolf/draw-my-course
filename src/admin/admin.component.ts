import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/pages/product-gallery/product.model';
import { ProductService } from 'src/pages/product-gallery/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  allProducts!: Product[];
  postProduct!: Product;

  postProductForm!: FormGroup;
  postButtonLoading: boolean = false;

  updateProductForm!: FormGroup;
  updatedProduct!: Product;
  updateButtonLoading: boolean = false;

  deleteProductForm!: FormGroup;
  deletedProduct!: Product;
  deleteButtonLoading: boolean = false;
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

    this.updateProductForm = new FormGroup({
      id_update: new FormControl('', [Validators.required]),
      title_update: new FormControl('', [Validators.required]),
      description_update: new FormControl(''),
      image_update: new FormControl(''),
      type_update: new FormControl('', [Validators.required]),
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

  updateProduct() {
    this.updateButtonLoading = true;
    this.productService
      .updateProduct(this.updateProductForm.controls['id_update'].value, {
        title: this.updateProductForm.controls['title_update'].value,
        description:
          this.updateProductForm.controls['description_update'].value,
        image: this.updateProductForm.controls['image_update'].value,
        type: this.updateProductForm.controls['type_update'].value,
      })
      .subscribe(
        (updatedProduct) => {
          this.updatedProduct = updatedProduct;
          this.updateButtonLoading = false;
        },
        (err) => {
          console.error(err);
          this.updateButtonLoading = false;
        }
      );
  }

  deleteProductFromDatabase() {
    this.deleteButtonLoading = true;
    this.productService
      .deleteProduct(this.deleteProductForm.controls['id'].value)
      .subscribe(
        (deletedProduct: Product) => {
          this.deletedProduct = deletedProduct;
          this.deleteButtonLoading = false;
        },
        (err) => {
          console.error(err);
          this.deleteButtonLoading = false;
        }
      );
  }
}
