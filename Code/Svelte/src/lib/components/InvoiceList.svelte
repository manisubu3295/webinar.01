<script lang="ts">
  import type { Invoice } from "$lib/api/billingApi";

  let {
    invoices,
    loading = false,
    onSelect,
  }: { invoices: Invoice[]; loading?: boolean; onSelect: (id: string) => void } = $props();
</script>

<div class="invoice-list">
  <h3>Today's Bills</h3>
  {#if loading}
    <p class="hint">Loading…</p>
  {:else if invoices.length === 0}
    <p class="hint">No bills yet.</p>
  {:else}
    <table>
      <thead>
        <tr><th>Bill #</th><th>Total</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        {#each invoices as inv (inv.id)}
          <tr>
            <td>{inv.billNumber}</td>
            <td>₹{inv.total.toFixed(2)}</td>
            <td>
              <span class="status-badge status-badge--{inv.status.toLowerCase()}">
                {inv.status}
              </span>
            </td>
            <td><button type="button" onclick={() => onSelect(inv.id)}>View</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
