export type InvoiceStatus = "OPEN" | "CANCELLED";

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
  status: InvoiceStatus;
  createdAt: string; // ISO timestamp
}

export interface CreateInvoiceItemInput {
  productCode: string;
  quantity: number;
}

export interface CreateInvoiceInput {
  customerId?: string;
  items: CreateInvoiceItemInput[];
}
