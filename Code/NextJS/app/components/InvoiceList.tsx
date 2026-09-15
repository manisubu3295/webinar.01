"use client";

import { Invoice } from "../api/billingApi";

export default function InvoiceList({
  invoices,
  onSelect,
  loading,
}: {
  invoices: Invoice[];
  onSelect: (id: string) => void;
  loading: boolean;
}) {
  return (
    <div className="invoice-list">
      <h3>Today&apos;s Bills</h3>
      {loading && <p className="hint">Loading…</p>}
      {!loading && invoices.length === 0 && <p className="hint">No bills yet.</p>}
      {invoices.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Bill #</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.billNumber}</td>
                <td>₹{inv.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-badge--${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </td>
                <td>
                  <button type="button" onClick={() => onSelect(inv.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
