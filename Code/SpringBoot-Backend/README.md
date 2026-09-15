# AAMEC Billing — Spring Boot Backend

Java 17, Spring Boot 4.1.1, an in-memory H2 database, and the **Maven Wrapper** (`mvnw`)
so you don't need Maven installed system-wide.

## Run

```bash
./mvnw spring-boot:run
# or build a jar and run it directly:
./mvnw -DskipTests package
java -jar target/billing-0.0.1-SNAPSHOT.jar
```

(Windows: use `mvnw.cmd` instead of `./mvnw`, and set `JAVA_HOME` to your JDK 17 install
if it isn't already set — the wrapper needs it.)

Server listens on **http://localhost:8080**.

## Data

In-memory H2 (`jdbc:h2:mem:billingdb`) — resets on restart, seeded by a
`CommandLineRunner` in `BillingApplication`. H2 console at `/h2-console` if you want to
poke at the tables directly.

## API

| Method | Path                        | Body                                                    |
|--------|-----------------------------|----------------------------------------------------------|
| GET    | `/api/products/:code`       | —                                                        |
| POST   | `/api/invoices`             | `{ customerId?, items: [{ productCode, quantity }] }`   |
| GET    | `/api/invoices/:id`         | —                                                        |
| POST   | `/api/invoices/:id/cancel`  | —                                                        |
| GET    | `/api/invoices?date=`       | `date` is an ISO date prefix filter, e.g. `2026-09-13`  |

## Concurrency / bill numbers

See the Javadoc on `BillNumberSequenceRepository.findForUpdate()`: bill numbers come from
a single-row `bill_number_sequence` table, locked with `PESSIMISTIC_WRITE` (`SELECT ...
FOR UPDATE`) inside the same `@Transactional` method that creates the invoice. A second
concurrent request blocks on that row lock until the first transaction commits, so two
requests can never compute the same "next" bill number. Cancelled bill numbers are
retired (status flips to `CANCELLED`), never reused.

## Folder structure

```
src/main/java/com/aadhirai/billing/
  controller/  BillingController.java, CreateInvoiceRequest.java
  service/     BillingService.java + exception types
  repository/  ProductRepository, CustomerRepository, InvoiceRepository, BillNumberSequenceRepository
  model/       Product, Customer, Invoice, LineItem, BillNumberSequence
  config/      CorsConfig.java (wide-open CORS for the demo)
  BillingApplication.java
```
