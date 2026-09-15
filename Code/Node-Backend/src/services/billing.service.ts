import { randomUUID } from "crypto";
import { Product, Customer } from "../models/product.model";
import {
  Invoice,
  LineItem,
  CreateInvoiceInput,
} from "../models/invoice.model";
import { Mutex } from "./mutex";

const DEFAULT_TAX_RATE = 0.18; // 18% GST unless a product overrides it

class ProductNotFoundError extends Error {
  constructor(code: string) {
    super(`Product not found: ${code}`);
    this.name = "ProductNotFoundError";
  }
}

class InvoiceNotFoundError extends Error {
  constructor(id: string) {
    super(`Invoice not found: ${id}`);
    this.name = "InvoiceNotFoundError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export { ProductNotFoundError, InvoiceNotFoundError, ValidationError };

class BillingService {
  private products = new Map<string, Product>();
  private customers = new Map<string, Customer>();
  private invoices = new Map<string, Invoice>();
  private billNumberCounter = 1000;
  private readonly mutex = new Mutex();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const products: Product[] = [
      { code: "P001", name: "Basmati Rice 5kg", price: 450, taxRate: 0.05 },
      { code: "P002", name: "Sunflower Oil 1L", price: 180, taxRate: 0.18 },
      { code: "P003", name: "Toothpaste 100g", price: 55, taxRate: 0.18 },
      { code: "P004", name: "Notebook 200pg", price: 40, taxRate: 0.12 },
    ];
    for (const p of products) this.products.set(p.code, p);

    const customer: Customer = {
      id: "C1001",
      name: "Ramesh Kumar",
      specialPricing: { P002: 165 }, // negotiated price on sunflower oil
    };
    this.customers.set(customer.id, customer);

    console.log(
      `Seeded ${this.products.size} products and ${this.customers.size} customer(s).`
    );
  }

  getProduct(code: string): Product {
    const product = this.products.get(code.toUpperCase());
    if (!product) throw new ProductNotFoundError(code);
    return product;
  }

  getInvoice(id: string): Invoice {
    const invoice = this.invoices.get(id);
    if (!invoice) throw new InvoiceNotFoundError(id);
    return invoice;
  }

  listInvoices(dateFilter?: string): Invoice[] {
    const all = Array.from(this.invoices.values()).sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
    if (!dateFilter) return all;
    return all.filter((inv) => inv.createdAt.startsWith(dateFilter));
  }

  async createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
    if (!input.items || input.items.length === 0) {
      throw new ValidationError("At least one line item is required");
    }
    for (const item of input.items) {
      if (!item.productCode || item.quantity <= 0) {
        throw new ValidationError(
          "Each item needs a productCode and a positive quantity"
        );
      }
    }

    const customer = input.customerId
      ? this.customers.get(input.customerId)
      : undefined;
    if (input.customerId && !customer) {
      throw new ValidationError(`Unknown customerId: ${input.customerId}`);
    }

    // Resolve pricing up front so a bad product code fails before we ever
    // touch the shared bill-number counter.
    const lineItems: LineItem[] = input.items.map((item) => {
      const product = this.getProduct(item.productCode);
      const unitPrice =
        customer?.specialPricing?.[product.code] ?? product.price;
      const taxRate = product.taxRate ?? DEFAULT_TAX_RATE;
      const lineSubtotal = round2(unitPrice * item.quantity);
      const lineTax = round2(lineSubtotal * taxRate);
      return {
        productCode: product.code,
        quantity: item.quantity,
        unitPrice,
        taxRate,
        lineSubtotal,
        lineTax,
        lineTotal: round2(lineSubtotal + lineTax),
      };
    });

    const subtotal = round2(lineItems.reduce((s, i) => s + i.lineSubtotal, 0));
    const tax = round2(lineItems.reduce((s, i) => s + i.lineTax, 0));
    const total = round2(subtotal + tax);

    // Only the bill-number assignment + store write is serialized; pricing
    // above can run concurrently for different requests.
    return this.mutex.runExclusive(() => {
      const billNumber = `INV-${String(this.billNumberCounter++).padStart(
        6,
        "0"
      )}`;
      const invoice: Invoice = {
        id: randomUUID(),
        billNumber,
        customerId: customer?.id,
        items: lineItems,
        subtotal,
        tax,
        total,
        status: "OPEN",
        createdAt: new Date().toISOString(),
      };
      this.invoices.set(invoice.id, invoice);
      return invoice;
    });
  }

  async cancelInvoice(id: string): Promise<Invoice> {
    return this.mutex.runExclusive(() => {
      const invoice = this.getInvoice(id);
      // Idempotent: cancelling an already-cancelled bill just returns it.
      // The bill number is never reassigned or reused (GST compliance).
      invoice.status = "CANCELLED";
      return invoice;
    });
  }
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export const billingService = new BillingService();
