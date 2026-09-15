<script lang="ts">
  import type { Invoice } from "$lib/api/billingApi";

  let {
    invoice,
    cancelling = false,
    onCancel,
  }: { invoice: Invoice; cancelling?: boolean; onCancel: () => void } = $props();

  function buildMailtoHref(inv: Invoice) {
    const lines = inv.items.map(
      (i) => `${i.productCode}  x${i.quantity}  @ ₹${i.unitPrice.toFixed(2)}  = ₹${i.lineTotal.toFixed(2)}`
    );
    const body = [
      `Bill ${inv.billNumber}`,
      `Status: ${inv.status}`,
      "",
      ...lines,
      "",
      `Subtotal: ₹${inv.subtotal.toFixed(2)}`,
      `Tax: ₹${inv.tax.toFixed(2)}`,
      `Total: ₹${inv.total.toFixed(2)}`,
    ].join("\n");
    return `mailto:?subject=${encodeURIComponent(`Bill ${inv.billNumber}`)}&body=${encodeURIComponent(body)}`;
  }

  function printBill() {
    window.print();
  }
</script>

<div class="bill-card" class:bill-card--cancelled={invoice.status === "CANCELLED"}>
  <div class="bill-card__header">
    <h2>Bill {invoice.billNumber}</h2>
    <span class="status-badge status-badge--{invoice.status.toLowerCase()}">
      {invoice.status}
    </span>
  </div>

  <table>
    <thead>
      <tr><th>Code</th><th>Qty</th><th>Unit Price</th><th>Line Total</th></tr>
    </thead>
    <tbody>
      {#each invoice.items as item}
        <tr>
          <td>{item.productCode}</td>
          <td>{item.quantity}</td>
          <td>₹{item.unitPrice.toFixed(2)}</td>
          <td>₹{item.lineTotal.toFixed(2)}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="bill-card__totals">
    <div><span>Subtotal</span><span>₹{invoice.subtotal.toFixed(2)}</span></div>
    <div><span>Tax</span><span>₹{invoice.tax.toFixed(2)}</span></div>
    <div class="bill-card__grand-total"><span>Total</span><span>₹{invoice.total.toFixed(2)}</span></div>
  </div>

  <div class="bill-card__actions">
    <button type="button" onclick={printBill}>Print</button>
    <a class="button-like" href={buildMailtoHref(invoice)}>Email</a>
    <button
      type="button"
      class="danger"
      disabled={invoice.status === "CANCELLED" || cancelling}
      onclick={onCancel}
    >
      {invoice.status === "CANCELLED" ? "Cancelled" : cancelling ? "Cancelling…" : "Cancel Bill"}
    </button>
  </div>
</div>
