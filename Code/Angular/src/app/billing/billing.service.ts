import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateInvoiceRequest, Invoice, Product } from '../shared/models/invoice.model';

// Configurable API base URL — point this at whichever backend you want to demo.
// Defaults to the Node.js/Express reference backend.
export const API_BASE_URL = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class BillingService {
  constructor(private http: HttpClient) {}

  getProduct(code: string): Observable<Product> {
    return this.http
      .get<Product>(`${API_BASE_URL}/api/products/${encodeURIComponent(code)}`)
      .pipe(catchError(this.handleError));
  }

  createInvoice(payload: CreateInvoiceRequest): Observable<Invoice> {
    return this.http
      .post<Invoice>(`${API_BASE_URL}/api/invoices`, payload)
      .pipe(catchError(this.handleError));
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.http
      .get<Invoice>(`${API_BASE_URL}/api/invoices/${encodeURIComponent(id)}`)
      .pipe(catchError(this.handleError));
  }

  cancelInvoice(id: string): Observable<Invoice> {
    return this.http
      .post<Invoice>(`${API_BASE_URL}/api/invoices/${encodeURIComponent(id)}/cancel`, {})
      .pipe(catchError(this.handleError));
  }

  listInvoices(date?: string): Observable<Invoice[]> {
    const qs = date ? `?date=${encodeURIComponent(date)}` : '';
    return this.http
      .get<Invoice[]>(`${API_BASE_URL}/api/invoices${qs}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ProgressEvent || err.status === 0) {
      return throwError(() => new Error(`Could not reach the backend at ${API_BASE_URL}. Is it running?`));
    }
    const message = err.error?.error || `Request failed (HTTP ${err.status})`;
    return throwError(() => new Error(message));
  }
}
