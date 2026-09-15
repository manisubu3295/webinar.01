import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getProduct,
  createInvoice,
  cancelInvoice,
  listInvoices,
  getInvoice,
} from "../api/billingApi";

export const useBillingStore = defineStore("billing", () => {
  // Cart / lookup state
  const cart = ref([]); // { productCode, name, unitPrice, quantity }
  const customerId = ref("");
  const lookupResult = ref(null);
  const lookupError = ref("");
  const lookingUp = ref(false);

  // Current invoice + history
  const invoice = ref(null);
  const invoices = ref([]);
  const creating = ref(false);
  const cancelling = ref(false);
  const loadingInvoices = ref(false);
  const error = ref("");

  const cartSubtotal = computed(() =>
    cart.value.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  );

  async function lookupProduct(code) {
    if (!code.trim()) return;
    lookingUp.value = true;
    lookupError.value = "";
    lookupResult.value = null;
    try {
      lookupResult.value = await getProduct(code.trim().toUpperCase());
    } catch (err) {
      lookupError.value = err.message;
    } finally {
      lookingUp.value = false;
    }
  }

  function addToCart(quantity) {
    if (!lookupResult.value) return;
    const qty = Math.max(1, Number(quantity) || 1);
    const product = lookupResult.value;
    const existing = cart.value.find((i) => i.productCode === product.code);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.value.push({
        productCode: product.code,
        name: product.name,
        unitPrice: product.price,
        quantity: qty,
      });
    }
    lookupResult.value = null;
  }

  function removeFromCart(productCode) {
    cart.value = cart.value.filter((i) => i.productCode !== productCode);
  }

  async function refreshInvoices() {
    loadingInvoices.value = true;
    try {
      const today = new Date().toISOString().slice(0, 10);
      invoices.value = await listInvoices(today);
    } catch {
      // Non-fatal for the demo.
    } finally {
      loadingInvoices.value = false;
    }
  }

  async function createBill() {
    if (cart.value.length === 0) return;
    creating.value = true;
    error.value = "";
    try {
      invoice.value = await createInvoice({
        customerId: customerId.value,
        items: cart.value.map((i) => ({ productCode: i.productCode, quantity: i.quantity })),
      });
      cart.value = [];
      await refreshInvoices();
    } catch (err) {
      error.value = err.message;
    } finally {
      creating.value = false;
    }
  }

  async function cancelBill() {
    if (!invoice.value) return;
    cancelling.value = true;
    error.value = "";
    try {
      invoice.value = await cancelInvoice(invoice.value.id);
      await refreshInvoices();
    } catch (err) {
      error.value = err.message;
    } finally {
      cancelling.value = false;
    }
  }

  async function selectInvoice(id) {
    error.value = "";
    try {
      invoice.value = await getInvoice(id);
    } catch (err) {
      error.value = err.message;
    }
  }

  return {
    cart,
    customerId,
    lookupResult,
    lookupError,
    lookingUp,
    invoice,
    invoices,
    creating,
    cancelling,
    loadingInvoices,
    error,
    cartSubtotal,
    lookupProduct,
    addToCart,
    removeFromCart,
    refreshInvoices,
    createBill,
    cancelBill,
    selectInvoice,
  };
});
