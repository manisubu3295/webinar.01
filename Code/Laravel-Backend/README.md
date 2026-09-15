# AAMEC Billing — Laravel Backend

PHP 8.3, Laravel 13, SQLite (fastest to set up, no external DB server needed).

## Run

```bash
composer install
php artisan migrate:fresh --seed   # creates db + seeds 4 products, 1 customer
php artisan serve --port=8000
```

Server listens on **http://localhost:8000**.

> Note: Django's backend also defaults to port 8000 — don't run both at once, or pass
> `--port=` to one of them.

## API

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

Responses are plain JSON (Laravel's default `{"data": ...}` API Resource envelope is
disabled in `AppServiceProvider::boot()`) and use camelCase, matching the shared contract
every backend in this demo exposes.

## Concurrency / bill numbers

See the doc comment on `BillingService::nextBillNumber()`: bill numbers come from a
single-row `bill_number_sequence` table, locked with `lockForUpdate()` (`SELECT ... FOR
UPDATE`) inside a `DB::transaction()`. A second concurrent request blocks on that row
lock until the first transaction commits, so two requests can never compute the same
"next" bill number. (`php artisan serve` itself processes one request at a time, so this
matters once you deploy behind php-fpm/Octane with multiple workers — the locking is
correct either way.) Cancelled bill numbers are retired, never reused.

## Folder structure

```
app/Http/Controllers/BillingController.php
app/Http/Resources/          ProductResource, InvoiceResource, LineItemResource (camelCase JSON)
app/Services/BillingService.php
app/Models/                  Product, Customer, CustomerSpecialPrice, Invoice, LineItem, BillNumberSequence
app/Exceptions/              ProductNotFoundException, InvoiceNotFoundException, BillingValidationException
routes/api.php
database/migrations/, database/seeders/DatabaseSeeder.php
```
