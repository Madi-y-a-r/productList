interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export type { Product };

export enum ProductCategory {
  Electronics = 'electronics',
  Clothing = 'clothing',
  Books = 'books',
  Food = 'food',
  Other = 'other'
}

export type ProductCreateInput = Omit<Product, 'id'>;
export type ProductUpdateInput = Partial<Omit<Product, 'id'>>;

export interface CartItem extends Product {
  quantity: number;
}
