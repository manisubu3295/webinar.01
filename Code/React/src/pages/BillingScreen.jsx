import { useEffect, useState, useCallback } from "react";
import {
  getProduct,
  createInvoice,
  cancelInvoice,
  listInvoices,
  getInvoice,
} from "../api/billingApi";
import CustomerSearch from "../components/CustomerSearch";
import BillCard from "../components/BillCard";
import InvoiceList from "../components/InvoiceList";

export default function BillingScreen() {
  const [code, setCode] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [lookingUp, setLookingUp] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]); // { productCode, name, unitPrice, quantity }
  const [customerId, setCustomerId] = useState("");

  const [invoice, setInvoice] = useState(null);
  const [creating, setCreating] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const refreshInvoices = useCallback(async () => {
    setLoadingInvoices(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const list = await listInvoices(today);
      setInvoices(list);
    } catch {
      // Non-fatal for the demo — the counter screen still works without history.
    } finally {
      setLoadingInvoices(false);
    }
  }, []);

  useEffect(() => {
    refreshInvoices();
  }, [refreshInvoices]);

  async function handleLookup(e) {
    e.preventDefault();
    if (!code.trim()) return;
    setLookingUp(true);
    setLookupError("");
    setLookupResult(null);
    try {
      const product = await getProduct(code.trim().toUpperCase());
      setLookupResult(product);
    } catch (err) {
      setLookupError(err.message);
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
        {
          productCode: lookupResult.code,
          name: lookupResult.name,
          unitPrice: lookupResult.price,
          quantity: qty,
        },
      ];
    });
    setCode("");
    setLookupResult(null);
    setQuantity(1);
  }

  function removeFromCart(productCode) {
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
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleCancel() {
    if (!invoice) return;
    setCancelling(true);
    setError("");
    try {
      const updated = await cancelInvoice(invoice.id);
      setInvoice(updated);
      refreshInvoices();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  }

  async function handleSelectInvoice(id) {
    setError("");
    try {
      const found = await getInvoice(id);
      setInvoice(found);
    } catch (err) {
      setError(err.message);
    }
  }

  const cartSubtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  return (
    <div className="billing-screen">
      <header className="billing-screen__header">
        <h1>AAMEC Billing — Counter</h1>
        <p className="hint">React · Vite · calling the Node.js backend</p>
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
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="qty-input"
              />
              <button type="button" onClick={addToCart}>Add to cart</button>
            </div>
          )}

          <CustomerSearch customerId={customerId} onChange={setCustomerId} />
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
