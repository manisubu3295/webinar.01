<script setup>
import { onMounted, ref } from "vue";
import { useBillingStore } from "../store/billing";
import BillCard from "../components/BillCard.vue";
import InvoiceList from "../components/InvoiceList.vue";

const store = useBillingStore();
const code = ref("");
const quantity = ref(1);

onMounted(() => {
  store.refreshInvoices();
});

async function handleLookup() {
  await store.lookupProduct(code.value);
  if (store.lookupResult) {
    code.value = "";
  }
}

function handleAddToCart() {
  store.addToCart(quantity.value);
  quantity.value = 1;
}
</script>

<template>
  <div class="billing-screen">
    <header class="billing-screen__header">
      <h1>AAMEC Billing — Counter</h1>
      <p class="hint">Vue 3 · Composition API + Pinia · calling the Node.js backend</p>
    </header>

    <div v-if="store.error" class="alert alert--error">{{ store.error }}</div>

    <div class="billing-screen__grid">
      <section class="panel">
        <h2>Product Lookup</h2>
        <form class="lookup-form" @submit.prevent="handleLookup">
          <input
            v-model="code"
            type="text"
            placeholder="Product code (e.g. P001)"
            autofocus
          />
          <button type="submit" :disabled="store.lookingUp">
            {{ store.lookingUp ? "Looking up…" : "Look up" }}
          </button>
        </form>
        <p v-if="store.lookupError" class="alert alert--error">{{ store.lookupError }}</p>
        <div v-if="store.lookupResult" class="lookup-result">
          <div>
            <strong>{{ store.lookupResult.name }}</strong>
            <p class="hint">
              ₹{{ store.lookupResult.price.toFixed(2) }} ·
              {{ (store.lookupResult.taxRate * 100).toFixed(0) }}% GST
            </p>
          </div>
          <input v-model.number="quantity" type="number" min="1" class="qty-input" />
          <button type="button" @click="handleAddToCart">Add to cart</button>
        </div>

        <div class="field-group">
          <label for="customerId">Customer ID (optional)</label>
          <input
            id="customerId"
            v-model.trim="store.customerId"
            type="text"
            placeholder="e.g. C1001"
          />
          <p class="hint">Leave blank for a walk-in sale. Regulars get their special pricing automatically.</p>
        </div>
      </section>

      <section class="panel">
        <h2>Cart</h2>
        <p v-if="store.cart.length === 0" class="hint">Cart is empty. Look up a product to add it.</p>
        <template v-else>
          <table>
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Unit</th><th>Line Total</th><th></th></tr>
            </thead>
            <tbody>
              <tr v-for="item in store.cart" :key="item.productCode">
                <td>{{ item.name }} <span class="hint">({{ item.productCode }})</span></td>
                <td>{{ item.quantity }}</td>
                <td>₹{{ item.unitPrice.toFixed(2) }}</td>
                <td>₹{{ (item.unitPrice * item.quantity).toFixed(2) }}</td>
                <td>
                  <button type="button" class="link-button" @click="store.removeFromCart(item.productCode)">
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="cart-subtotal">Cart subtotal (before tax): ₹{{ store.cartSubtotal.toFixed(2) }}</p>
          <button type="button" class="primary" :disabled="store.creating" @click="store.createBill()">
            {{ store.creating ? "Creating Bill…" : "Create Bill" }}
          </button>
        </template>
      </section>
    </div>

    <section v-if="store.invoice" class="panel">
      <BillCard
        :invoice="store.invoice"
        :cancelling="store.cancelling"
        @cancel="store.cancelBill()"
      />
    </section>

    <section class="panel">
      <InvoiceList
        :invoices="store.invoices"
        :loading="store.loadingInvoices"
        @select="store.selectInvoice($event)"
      />
    </section>
  </div>
</template>
