"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getProduct,
  createInvoice,
  cancelInvoice,
  listInvoices,
  getInvoice,
  Product,
  Invoice,
} from "../api/billingApi";
import BillCard from "../components/BillCard";
import InvoiceList from "../components/InvoiceList";

interface CartItem {
  productCode: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export default function BillingPage() {
  const [code, setCode] = useState("");
  const [lookupResult, setLookupResult] = useState<Product | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [lookingUp, setLookingUp] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerId, setCustomerId] = useState("");

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [creating, setCreating] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const refreshInvoices = useCallback(async () => {
    setLoadingInvoices(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      setInvoices(await listInvoices(today));
    } catch {
      // Non-fatal for the demo.
    } finally {
      setLoadingInvoices(false);
    }
  }, []);

  useEffect(() => {
    refreshInvoices();
  }, [refreshInvoices]);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLookingUp(true);
    setLookupError("");
    setLookupResult(null);
    try {
      setLookupResult(await getProduct(code.trim().toUpperCase()));
    } catch (err) {
      setLookupError((err as Error).message);
    } finally {
      setLookingUp(false);
    }
  }

  function addToCart() {
    if (!lookupResult) return;
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prev) => {
      const existing = prev.find((i) => i.productCode === lookupResult.code);
      if (existing) {
        return prev.map((i) =>
          i.productCode === lookupResult.code ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        { productCode: lookupResult.code, name: lookupResult.name, unitPrice: lookupResult.price, quantity: qty },
      ];
    });
    setCode("");
    setLookupResult(null);
    setQuantity(1);
  }

  function removeFromCart(productCode: string) {
    setCart((prev) => prev.filter((i) => i.productCode !== productCode));
  }

  async function handleCreateBill() {
    if (cart.length === 0) return;
    setCreating(true);
    setError("");
    try {
      const result = await createInvoice({
        customerId,
        items: cart.map((i) => ({ productCode: i.productCode, quantity: i.quantity })),
      });
      setInvoice(result);
      setCart([]);
      refreshInvoices();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function handleCancel() {
    if (!invoice) return;
    setCancelling(true);
    setError("");
    try {
      setInvoice(await cancelInvoice(invoice.id));
      refreshInvoices();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCancelling(false);
    }
  }

  async function handleSelectInvoice(id: string) {
    setError("");
    try {
      setInvoice(await getInvoice(id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const cartSubtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  return (
    <div className="billing-screen">
      <header className="billing-screen__header">
        <h1>AAMEC Billing — Counter</h1>
        <p className="hint">Next.js (client component) · calling an external Node.js backend</p>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <div className="billing-screen__grid">
        <section className="panel">
          <h2>Product Lookup</h2>
          <form onSubmit={handleLookup} className="lookup-form">
            <input
              type="text"
              placeholder="Product code (e.g. P001)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
            <button type="submit" disabled={lookingUp}>
              {lookingUp ? "Looking up…" : "Look up"}
            </button>
          </form>
          {lookupError && <p className="alert alert--error">{lookupError}</p>}
          {lookupResult && (
            <div className="lookup-result">
              <div>
                <strong>{lookupResult.name}</strong>
                <p className="hint">
                  ₹{lookupResult.price.toFixed(2)} · {(lookupResult.taxRate * 100).toFixed(0)}% GST
                </p>
              </div>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="qty-input"
              />
              <button type="button" onClick={addToCart}>Add to cart</button>
            </div>
          )}

          <div className="field-group">
            <label htmlFor="customerId">Customer ID (optional)</label>
            <input
              id="customerId"
              type="text"
              placeholder="e.g. C1001"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value.trim())}
            />
            <p className="hint">Leave blank for a walk-in sale. Regulars get their special pricing automatically.</p>
          </div>
        </section>

        <section className="panel">
          <h2>Cart</h2>
          {cart.length === 0 && <p className="hint">Cart is empty. Look up a product to add it.</p>}
          {cart.length > 0 && (
            <>
              <table>
                <thead>
                  <tr><th>Item</th><th>Qty</th><th>Unit</th><th>Line Total</th><th></th></tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.productCode}>
                      <td>{item.name} <span className="hint">({item.productCode})</span></td>
                      <td>{item.quantity}</td>
                      <td>₹{item.unitPrice.toFixed(2)}</td>
                      <td>₹{(item.unitPrice * item.quantity).toFixed(2)}</td>
                      <td>
                        <button type="button" className="link-button" onClick={() => removeFromCart(item.productCode)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="cart-subtotal">Cart subtotal (before tax): ₹{cartSubtotal.toFixed(2)}</p>
              <button type="button" className="primary" onClick={handleCreateBill} disabled={creating}>
                {creating ? "Creating Bill…" : "Create Bill"}
              </button>
            </>
          )}
        </section>
      </div>

      {invoice && (
        <section className="panel">
          <BillCard invoice={invoice} onCancel={handleCancel} cancelling={cancelling} />
        </section>
      )}

      <section className="panel">
        <InvoiceList invoices={invoices} onSelect={handleSelectInvoice} loading={loadingInvoices} />
      </section>
    </div>
  );
}
