// Configurable API base URL — this points at an EXTERNAL backend service.
// This app deliberately does NOT use Next.js route handlers for the billing
// API; it's a client component calling a separate, real backend (defaults to
// the Node.js/Express reference backend).
export const API_BASE_URL = "http://localhost:3000";

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
  status: "OPEN" | "CANCELLED";
  createdAt: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(`Could not reach the backend at ${API_BASE_URL}. Is it running?`);
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(body?.error || `Request failed (HTTP ${res.status})`);
  }
  return body as T;
}

export function getProduct(code: string): Promise<Product> {
  return request(`/api/products/${encodeURIComponent(code)}`);
}

export function createInvoice(input: {
  customerId?: string;
  items: { productCode: string; quantity: number }[];
}): Promise<Invoice> {
  return request("/api/invoices", {
    method: "POST",
    body: JSON.stringify({ customerId: input.customerId || undefined, items: input.items }),
  });
}

export function getInvoice(id: string): Promise<Invoice> {
  return request(`/api/invoices/${encodeURIComponent(id)}`);
}

export function cancelInvoice(id: string): Promise<Invoice> {
  return request(`/api/invoices/${encodeURIComponent(id)}/cancel`, { method: "POST" });
}

export function listInvoices(date?: string): Promise<Invoice[]> {
  const qs = date ? `?date=${encodeURIComponent(date)}` : "";
  return request(`/api/invoices${qs}`);
}
