// types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  badge?: "BEST SELLER" | "NEW" | string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CategoryPageData {
  name: string;
  description: string;
  products: Product[];
}
