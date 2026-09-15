# AAMEC Billing — Django / DRF Backend

## Run

```bash
python -m venv venv
venv\Scripts\activate            # Windows  (source venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data       # seeds 4 products + 1 customer with special pricing
python manage.py runserver 8000
```

Server listens on **http://localhost:8000**. Uses SQLite (`db.sqlite3`, Django's default).

## API

Paths deliberately have **no trailing slash** (`APPEND_SLASH = False` in settings.py) and
request/response bodies use **camelCase**, matching the shared contract every backend in
this demo exposes — so any of the 5 frontends can be pointed at this backend unchanged.

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

## Concurrency / bill numbers

See the docstring on `next_bill_number()` in `billing/services.py`: a single-row
`BillNumberSequence` table is locked with `select_for_update()` inside a
`transaction.atomic()` block before being incremented, so two concurrent requests can
never read the same "next" value — the DB serializes the second request's lock
acquisition until the first transaction commits. Cancelled bill numbers are retired
(status flips to `CANCELLED`), never reused or reassigned.

## Folder structure

```
billing/
  models.py       Product, Customer, CustomerSpecialPrice, Invoice, LineItem, BillNumberSequence
  services.py      pricing + bill-number + cancel business logic
  serializers.py   DRF serializers (camelCase on the wire)
  views.py, urls.py
  management/commands/seed_data.py
billing_system/
  settings.py, urls.py
manage.py
```
