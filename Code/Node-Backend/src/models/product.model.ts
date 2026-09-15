export interface Product {
  code: string;
  name: string;
  price: number;
  /** e.g. 0.18 for 18% GST */
  taxRate: number;
}

export interface Customer {
  id: string;
  name: string;
  /** productCode -> negotiated unit price, overrides Product.price when present */
  specialPricing?: Record<string, number>;
}
