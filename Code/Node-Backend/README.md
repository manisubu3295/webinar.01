# AAMEC Billing — Node.js / Express / TypeScript Backend

The reference backend for the AAMEC Billing demo. This is the one all 5 frontend demos
point to by default.

## Run

```bash
npm install
npm run dev
```

Server starts on **http://localhost:3000** (override with `PORT=xxxx npm run dev`).

## Data

In-memory only (resets on restart). Seeded on startup:
- Products: `P001` Basmati Rice 5kg (₹450, 5% GST), `P002` Sunflower Oil 1L (₹180, 18% GST),
  `P003` Toothpaste 100g (₹55, 18% GST), `P004` Notebook 200pg (₹40, 12% GST)
- Customer: `C1001` Ramesh Kumar — special price ₹165 on `P002`

## API

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

## Concurrency / bill numbers

See the comment in `src/services/mutex.ts`: invoice creation and cancellation are
serialized through an in-process async mutex (`Mutex.runExclusive`), so bill-number
assignment can never race across concurrent requests, even once the in-memory store is
swapped for a real database with awaited calls. Cancelled bill numbers are retired, never
reused.

## Build for production

```bash
npm run build
npm start
```
