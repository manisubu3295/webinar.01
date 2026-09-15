# AAMEC Billing — Vue Frontend

A billing counter screen built with Vue 3 (Vite), the Composition API (`<script setup>`),
and Pinia for cart/invoice state.

## Run

```bash
npm install
npm run dev
```

Opens on **http://localhost:5174** by default (Vite auto-picks a free port; check the
terminal output).

## API base URL

`API_BASE_URL` in `src/api/billingApi.js` — defaults to `http://localhost:3000` (the
Node.js/Express reference backend). Change it to point at any of the other 5 backends.

## Folder structure

```
src/
  components/  BillCard.vue, InvoiceList.vue
  views/       BillingScreen.vue
  store/       billing.js (Pinia store: cart, lookup, invoice, invoice history)
  api/         billingApi.js
  App.vue, main.js
```

## Build for production

```bash
npm run build
npm run preview
```
