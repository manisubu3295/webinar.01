# AAMEC Billing — Next.js Frontend

A billing counter screen built with Next.js (App Router). The `/billing` route is a
**client component** that calls an external backend directly with `fetch()` — it does
not use Next's own API routes, so this genuinely demonstrates Next.js as a frontend
talking to a separate real backend service.

## Run

```bash
npm install
npm run dev
```

Open **http://localhost:3001** → click through to `/billing` (the dev/start scripts
already run on port 3001 so they don't collide with the Node backend's port 3000).

The API base URL is the `API_BASE_URL` constant in `app/api/billingApi.ts` — defaults to
`http://localhost:3000` (the Node.js/Express reference backend). Change it to point at
any of the other 5 backends.

## Folder structure

```
app/
  billing/page.tsx     - the billing counter screen (client component)
  billing/layout.tsx
  components/          - BillCard.tsx, InvoiceList.tsx
  api/billingApi.ts     - fetch() wrapper + types for the shared API contract
```

## Build for production

```bash
npm run build
npm start
```
