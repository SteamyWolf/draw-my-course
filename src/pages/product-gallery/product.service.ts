import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:4000/api/product');
  }

  getOneProduct(id: string) {
    return this.http.get<Product>(`http://localhost:4000/api/product/${id}`);
  }

  postNewProduct(product: Product) {
    return this.http.post<Product>(
      'http://localhost:4000/api/product',
      product
    );
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(
      `http://localhost:4000/api/product/${id}`,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`http://localhost:4000/api/product/${id}`);
  }
}
