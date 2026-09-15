function buildMailtoHref(invoice) {
  const lines = invoice.items.map(
    (i) => `${i.productCode}  x${i.quantity}  @ ₹${i.unitPrice.toFixed(2)}  = ₹${i.lineTotal.toFixed(2)}`
  );
  const body = [
    `Bill ${invoice.billNumber}`,
    `Status: ${invoice.status}`,
    "",
    ...lines,
    "",
    `Subtotal: ₹${invoice.subtotal.toFixed(2)}`,
    `Tax: ₹${invoice.tax.toFixed(2)}`,
    `Total: ₹${invoice.total.toFixed(2)}`,
  ].join("\n");
  return `mailto:?subject=${encodeURIComponent(`Bill ${invoice.billNumber}`)}&body=${encodeURIComponent(body)}`;
}

export default function BillCard({ invoice, onCancel, cancelling }) {
  if (!invoice) return null;

  const isCancelled = invoice.status === "CANCELLED";

  return (
    <div className={`bill-card ${isCancelled ? "bill-card--cancelled" : ""}`}>
      <div className="bill-card__header">
        <h2>Bill {invoice.billNumber}</h2>
        <span className={`status-badge status-badge--${invoice.status.toLowerCase()}`}>
          {invoice.status}
        </span>
      </div>

      <table className="bill-card__items">
        <thead>
          <tr>
            <th>Code</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.productCode}</td>
              <td>{item.quantity}</td>
              <td>₹{item.unitPrice.toFixed(2)}</td>
              <td>₹{item.lineTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-card__totals">
        <div><span>Subtotal</span><span>₹{invoice.subtotal.toFixed(2)}</span></div>
        <div><span>Tax</span><span>₹{invoice.tax.toFixed(2)}</span></div>
        <div className="bill-card__grand-total"><span>Total</span><span>₹{invoice.total.toFixed(2)}</span></div>
      </div>

      <div className="bill-card__actions">
        <button type="button" onClick={() => window.print()}>Print</button>
        <a
          className="button-like"
          href={buildMailtoHref(invoice)}
        >
          Email
        </a>
        <button
          type="button"
          disabled={isCancelled || cancelling}
          onClick={onCancel}
          className="danger"
        >
          {isCancelled ? "Cancelled" : cancelling ? "Cancelling…" : "Cancel Bill"}
        </button>
      </div>
    </div>
  );
}
