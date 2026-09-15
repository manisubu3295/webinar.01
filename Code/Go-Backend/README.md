# AAMEC Billing — Go Backend

Standard library only (`net/http`), no external dependencies.

## Build & run

```bash
go build -o billing-server ./cmd/server
./billing-server                 # listens on :8081 (override with PORT=xxxx)
```

Or just run it directly during development:

```bash
go run ./cmd/server
```

## Data

In-memory only (resets on restart), protected by a `sync.Mutex` — see the comment on
`Service` in `internal/billing/service.go` for why the whole create/cancel critical
section (read counter → assign bill number → store) is locked, not just the counter
increment. Seeded on startup:
- Products: `P001` Basmati Rice 5kg (₹450, 5% GST), `P002` Sunflower Oil 1L (₹180, 18%
  GST), `P003` Toothpaste 100g (₹55, 18% GST), `P004` Notebook 200pg (₹40, 12% GST)
- Customer: `C1001` Ramesh Kumar — special price ₹165 on `P002`

## API

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

CORS is wide open (`Access-Control-Allow-Origin: *`) via the `billing.CORS` middleware.

## Folder structure

```
cmd/server/main.go
internal/billing/model.go     Product, Customer, LineItem, Invoice
internal/billing/service.go   in-memory store + business logic (mutex-protected)
internal/billing/handler.go   net/http handlers + CORS middleware
```
