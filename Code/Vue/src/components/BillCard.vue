<script setup>
const props = defineProps({
  invoice: { type: Object, required: true },
  cancelling: { type: Boolean, default: false },
});
const emit = defineEmits(["cancel"]);

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

function printBill() {
  window.print();
}
</script>

<template>
  <div class="bill-card" :class="{ 'bill-card--cancelled': invoice.status === 'CANCELLED' }">
    <div class="bill-card__header">
      <h2>Bill {{ invoice.billNumber }}</h2>
      <span class="status-badge" :class="`status-badge--${invoice.status.toLowerCase()}`">
        {{ invoice.status }}
      </span>
    </div>

    <table>
      <thead>
        <tr><th>Code</th><th>Qty</th><th>Unit Price</th><th>Line Total</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in invoice.items" :key="idx">
          <td>{{ item.productCode }}</td>
          <td>{{ item.quantity }}</td>
          <td>₹{{ item.unitPrice.toFixed(2) }}</td>
          <td>₹{{ item.lineTotal.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="bill-card__totals">
      <div><span>Subtotal</span><span>₹{{ invoice.subtotal.toFixed(2) }}</span></div>
      <div><span>Tax</span><span>₹{{ invoice.tax.toFixed(2) }}</span></div>
      <div class="bill-card__grand-total"><span>Total</span><span>₹{{ invoice.total.toFixed(2) }}</span></div>
    </div>

    <div class="bill-card__actions">
      <button type="button" @click="printBill">Print</button>
      <a class="button-like" :href="buildMailtoHref(invoice)">Email</a>
      <button
        type="button"
        class="danger"
        :disabled="invoice.status === 'CANCELLED' || cancelling"
        @click="emit('cancel')"
      >
        {{ invoice.status === "CANCELLED" ? "Cancelled" : cancelling ? "Cancelling…" : "Cancel Bill" }}
      </button>
    </div>
  </div>
</template>
