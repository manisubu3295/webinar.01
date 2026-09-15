export interface Product {
  code: string;
  name: string;
  price: number;
  taxRate: number;
}

export interface LineItem {
  productCode: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  lineSubtotal: number;
  lineTax: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  billNumber: string;
  customerId?: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'OPEN' | 'CANCELLED';
  createdAt: string;
}

export interface CreateInvoiceItem {
  productCode: string;
  quantity: number;
}

export interface CreateInvoiceRequest {
  customerId?: string;
  items: CreateInvoiceItem[];
}

/** Cart line before a bill is created — client-side only. */
export interface CartItem {
  productCode: string;
  name: string;
  unitPrice: number;
  quantity: number;
}
