import { Component, OnInit } from '@angular/core';
import { BillingService } from './billing.service';
import { CartItem, Invoice, Product } from '../shared/models/invoice.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  // Product lookup
  code = '';
  lookupResult: Product | null = null;
  lookupError = '';
  lookingUp = false;
  quantity = 1;

  // Cart / customer
  cart: CartItem[] = [];
  customerId = '';

  // Current invoice
  invoice: Invoice | null = null;
  creating = false;
  cancelling = false;
  error = '';

  // History
  invoices: Invoice[] = [];
  loadingInvoices = false;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.refreshInvoices();
  }

  get cartSubtotal(): number {
    return this.cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  }

  refreshInvoices(): void {
    this.loadingInvoices = true;
    const today = new Date().toISOString().slice(0, 10);
    this.billingService.listInvoices(today).subscribe({
      next: (list) => {
        this.invoices = list;
        this.loadingInvoices = false;
      },
      error: () => {
        // Non-fatal for the demo — the counter screen still works without history.
        this.loadingInvoices = false;
      },
    });
  }

  lookup(): void {
    if (!this.code.trim()) return;
    this.lookingUp = true;
    this.lookupError = '';
    this.lookupResult = null;
    this.billingService.getProduct(this.code.trim().toUpperCase()).subscribe({
      next: (product) => {
        this.lookupResult = product;
        this.lookingUp = false;
      },
      error: (err: Error) => {
        this.lookupError = err.message;
        this.lookingUp = false;
      },
    });
  }

  addToCart(): void {
    if (!this.lookupResult) return;
    const qty = Math.max(1, Number(this.quantity) || 1);
    const product = this.lookupResult;
    const existing = this.cart.find((i) => i.productCode === product.code);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({
        productCode: product.code,
        name: product.name,
        unitPrice: product.price,
        quantity: qty,
      });
    }
    this.code = '';
    this.lookupResult = null;
    this.quantity = 1;
  }

  removeFromCart(productCode: string): void {
    this.cart = this.cart.filter((i) => i.productCode !== productCode);
  }

  createBill(): void {
    if (this.cart.length === 0) return;
    this.creating = true;
    this.error = '';
    this.billingService
      .createInvoice({
        customerId: this.customerId || undefined,
        items: this.cart.map((i) => ({ productCode: i.productCode, quantity: i.quantity })),
      })
      .subscribe({
        next: (invoice) => {
          this.invoice = invoice;
          this.cart = [];
          this.creating = false;
          this.refreshInvoices();
        },
        error: (err: Error) => {
          this.error = err.message;
          this.creating = false;
        },
      });
  }

  cancelBill(): void {
    if (!this.invoice) return;
    this.cancelling = true;
    this.error = '';
    this.billingService.cancelInvoice(this.invoice.id).subscribe({
      next: (invoice) => {
        this.invoice = invoice;
        this.cancelling = false;
        this.refreshInvoices();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.cancelling = false;
      },
    });
  }

  selectInvoice(id: string): void {
    this.error = '';
    this.billingService.getInvoice(id).subscribe({
      next: (invoice) => (this.invoice = invoice),
      error: (err: Error) => (this.error = err.message),
    });
  }

  printBill(): void {
    window.print();
  }

  mailtoHref(invoice: Invoice): string {
    const lines = invoice.items.map(
      (i) => `${i.productCode}  x${i.quantity}  @ Rs.${i.unitPrice.toFixed(2)}  = Rs.${i.lineTotal.toFixed(2)}`
    );
    const body = [
      `Bill ${invoice.billNumber}`,
      `Status: ${invoice.status}`,
      '',
      ...lines,
      '',
      `Subtotal: Rs.${invoice.subtotal.toFixed(2)}`,
      `Tax: Rs.${invoice.tax.toFixed(2)}`,
      `Total: Rs.${invoice.total.toFixed(2)}`,
    ].join('\n');
    return `mailto:?subject=${encodeURIComponent(`Bill ${invoice.billNumber}`)}&body=${encodeURIComponent(body)}`;
  }
}
