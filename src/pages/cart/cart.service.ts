import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../product-gallery/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  getProductById(id: string | null) {
    if (!id) return;
    return this.http.get<Product>(`http://localhost:4000/api/product/${id}`);
  }
}
