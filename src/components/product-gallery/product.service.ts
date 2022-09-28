import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:4000/api/product');
  }

  postNewProduct(product: Product) {
    return this.http.post<Product>(
      'http://localhost:4000/api/product',
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>('http://localhost:4000/api/product', {
      body: id,
    });
  }
}
