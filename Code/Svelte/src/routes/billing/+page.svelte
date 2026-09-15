<script lang="ts">
  import { onMount } from "svelte";
  import { cart, customerId, addToCart, removeFromCart, clearCart } from "$lib/stores/billing";
  import {
    getProduct,
    createInvoice,
    cancelInvoice,
    listInvoices,
    getInvoice,
    type Product,
    type Invoice,
  } from "$lib/api/billingApi";
  import BillCard from "$lib/components/BillCard.svelte";
  import InvoiceList from "$lib/components/InvoiceList.svelte";

  let code = $state("");
  let quantity = $state(1);
  let lookupResult: Product | null = $state(null);
  let lookupError = $state("");
  let lookingUp = $state(false);

  let invoice: Invoice | null = $state(null);
  let creating = $state(false);
  let cancelling = $state(false);
  let error = $state("");

  let invoices: Invoice[] = $state([]);
  let loadingInvoices = $state(false);

  let cartSubtotal = $derived($cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0));

  onMount(() => {
    refreshInvoices();
  });

  async function refreshInvoices() {
    loadingInvoices = true;
    try {
      const today = new Date().toISOString().slice(0, 10);
      invoices = await listInvoices(today);
    } catch {
      // Non-fatal for the demo.
    } finally {
      loadingInvoices = false;
    }
  }

  async function handleLookup(e: SubmitEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    lookingUp = true;
    lookupError = "";
    lookupResult = null;
    try {
      lookupResult = await getProduct(code.trim().toUpperCase());
    } catch (err) {
      lookupError = (err as Error).message;
    } finally {
      lookingUp = false;
    }
  }

  function handleAddToCart() {
    if (!lookupResult) return;
    addToCart(lookupResult, quantity);
    code = "";
    lookupResult = null;
    quantity = 1;
  }

  async function handleCreateBill() {
    if ($cart.length === 0) return;
    creating = true;
    error = "";
    try {
      invoice = await createInvoice({
        customerId: $customerId,
        items: $cart.map((i) => ({ productCode: i.productCode, quantity: i.quantity })),
      });
      clearCart();
      await refreshInvoices();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      creating = false;
    }
  }

  async function handleCancel() {
    if (!invoice) return;
    cancelling = true;
    error = "";
    try {
      invoice = await cancelInvoice(invoice.id);
      await refreshInvoices();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      cancelling = false;
    }
  }

  async function handleSelectInvoice(id: string) {
    error = "";
    try {
      invoice = await getInvoice(id);
    } catch (err) {
      error = (err as Error).message;
    }
  }
</script>

<div class="billing-screen">
  <header class="billing-screen__header">
    <h1>AAMEC Billing — Counter</h1>
    <p class="hint">SvelteKit · Svelte store for cart state · calling the Node.js backend</p>
  </header>

  {#if error}
    <div class="alert alert--error">{error}</div>
  {/if}

  <div class="billing-screen__grid">
    <section class="panel">
      <h2>Product Lookup</h2>
      <form class="lookup-form" onsubmit={handleLookup}>
        <input type="text" placeholder="Product code (e.g. P001)" bind:value={code} />
        <button type="submit" disabled={lookingUp}>
          {lookingUp ? "Looking up…" : "Look up"}
        </button>
      </form>
      {#if lookupError}
        <p class="alert alert--error">{lookupError}</p>
      {/if}
      {#if lookupResult}
        <div class="lookup-result">
          <div>
            <strong>{lookupResult.name}</strong>
            <p class="hint">
              ₹{lookupResult.price.toFixed(2)} · {(lookupResult.taxRate * 100).toFixed(0)}% GST
            </p>
          </div>
          <input type="number" min="1" bind:value={quantity} class="qty-input" />
          <button type="button" onclick={handleAddToCart}>Add to cart</button>
        </div>
      {/if}

      <div class="field-group">
        <label for="customerId">Customer ID (optional)</label>
        <input
          id="customerId"
          type="text"
          placeholder="e.g. C1001"
          bind:value={$customerId}
        />
        <p class="hint">Leave blank for a walk-in sale. Regulars get their special pricing automatically.</p>
      </div>
    </section>

    <section class="panel">
      <h2>Cart</h2>
      {#if $cart.length === 0}
        <p class="hint">Cart is empty. Look up a product to add it.</p>
      {:else}
        <table>
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Unit</th><th>Line Total</th><th></th></tr>
          </thead>
          <tbody>
            {#each $cart as item (item.productCode)}
              <tr>
                <td>{item.name} <span class="hint">({item.productCode})</span></td>
                <td>{item.quantity}</td>
                <td>₹{item.unitPrice.toFixed(2)}</td>
                <td>₹{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td>
                  <button type="button" class="link-button" onclick={() => removeFromCart(item.productCode)}>
                    Remove
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <p class="cart-subtotal">Cart subtotal (before tax): ₹{cartSubtotal.toFixed(2)}</p>
        <button type="button" class="primary" disabled={creating} onclick={handleCreateBill}>
          {creating ? "Creating Bill…" : "Create Bill"}
        </button>
      {/if}
    </section>
  </div>

  {#if invoice}
    <section class="panel">
      <BillCard {invoice} {cancelling} onCancel={handleCancel} />
    </section>
  {/if}

  <section class="panel">
    <InvoiceList {invoices} loading={loadingInvoices} onSelect={handleSelectInvoice} />
  </section>
</div>
