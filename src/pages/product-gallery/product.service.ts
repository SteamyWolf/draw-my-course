import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(
      'https://draw-my-course.herokuapp.com/api/product'
    );
  }

  getOneProduct(id: string) {
    return this.http.get<Product>(
      `https://draw-my-course.herokuapp.com/api/product/${id}`
    );
  }

  postNewProduct(product: Product) {
    return this.http.post<Product>(
      'https://draw-my-course.herokuapp.com/api/product',
      product
    );
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Product>(
      `https://draw-my-course.herokuapp.com/api/product/${id}`,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(
      `https://draw-my-course.herokuapp.com/api/product/${id}`
    );
  }
}
