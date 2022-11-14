import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url: string = environment.SERVER_URL;
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`${this.url}/api/product`);
  }

  getOneProduct(id: string) {
    return this.http.get<Product>(`${this.url}/api/product/${id}`);
  }

  postNewProduct(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product`, product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(`${this.url}/api/product/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.url}/api/product/${id}`);
  }
}
