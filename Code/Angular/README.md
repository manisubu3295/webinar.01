# AAMEC Billing — Angular Frontend

A billing counter screen built with Angular 18 (NgModule-based, not standalone), using
`HttpClient` and a `BillingService`.

## Run

```bash
npm install
npm start
```

Opens on **http://localhost:4200**.

## API base URL

`API_BASE_URL` in `src/app/billing/billing.service.ts` — defaults to
`http://localhost:3000` (the Node.js/Express reference backend). Change it to point at
any of the other 5 backends.

## Folder structure

```
src/app/
  billing/   billing.component.ts/.html/.css, billing.service.ts, billing.module.ts
  customer/  customer.component.ts/.html — the optional customer-ID field
  shared/models/ invoice.model.ts — Product, Invoice, LineItem, CartItem types
src/main.ts
```

## Build for production

```bash
npm run build
```

Output goes to `dist/aamec-billing-angular`.

## Note on Angular/Node versions

This project targets **Angular 18** (not the latest Angular CLI) because it runs on
Node.js 20; Angular 19+ CLI requires Node 22+/24+/26+. If you're on a newer Node, feel
free to upgrade.
