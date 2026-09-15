# AAMEC Billing — SvelteKit Frontend

A billing counter screen built with SvelteKit (Svelte 5), using a Svelte store
(`src/lib/stores/billing.js`) for cart state.

## Run

```bash
npm install
npm run dev
```

Open the printed URL (Vite auto-picks a free port) and go to **/billing**.

## API base URL

`API_BASE_URL` in `src/lib/api/billingApi.js` — defaults to `http://localhost:3000` (the
Node.js/Express reference backend). Change it to point at any of the other 5 backends.

## Folder structure

```
src/
  lib/components/  BillCard.svelte, InvoiceList.svelte
  lib/stores/      billing.js — writable cart + customerId stores
  lib/api/         billingApi.js
  routes/billing/+page.svelte
  routes/+page.svelte — links to /billing
```

## Build for production

```bash
npm run build
npm run preview
```
