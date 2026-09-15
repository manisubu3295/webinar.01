<script setup>
defineProps({
  invoices: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["select"]);
</script>

<template>
  <div class="invoice-list">
    <h3>Today's Bills</h3>
    <p v-if="loading" class="hint">Loading…</p>
    <p v-else-if="invoices.length === 0" class="hint">No bills yet.</p>
    <table v-else>
      <thead>
        <tr><th>Bill #</th><th>Total</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="inv in invoices" :key="inv.id">
          <td>{{ inv.billNumber }}</td>
          <td>₹{{ inv.total.toFixed(2) }}</td>
          <td>
            <span class="status-badge" :class="`status-badge--${inv.status.toLowerCase()}`">
              {{ inv.status }}
            </span>
          </td>
          <td><button type="button" @click="emit('select', inv.id)">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
