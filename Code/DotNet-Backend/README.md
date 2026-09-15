# AAMEC Billing — ASP.NET Core (.NET 8) Backend

EF Core with the **InMemory** database provider — no external DB setup needed.

## Run

```bash
dotnet restore
dotnet run
```

Server listens on **http://localhost:5000** (override with `PORT=xxxx dotnet run`).

## API

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

JSON is camelCase with string enum values (`"status": "OPEN"`), matching the shared
contract every backend in this demo exposes.

## Concurrency / bill numbers

See the doc comment on `BillingService.BillNumberLock`: EF Core's InMemory provider
doesn't implement real row locking, so bill-number allocation is serialized with a
process-wide `SemaphoreSlim(1, 1)` around "read counter → increment → save" — the async
equivalent of a `lock` block. Pointed at a real database, you'd swap this for a
transaction + row lock, the same approach the other backends in this demo use. Cancelled
bill numbers are retired (status flips to `CANCELLED`), never reused.

## Folder structure

```
Controllers/  BillingController.cs
Services/     BillingService.cs, BillingExceptions.cs
Models/       Product.cs, Customer.cs, Invoice.cs, Dtos.cs, BillingDbContext.cs
Program.cs
```
