export interface Product {
  _id?: string;
  title: string;
  description?: string;
  image?: string;
  type: 'digital' | 'physical';
  price: number;
}
