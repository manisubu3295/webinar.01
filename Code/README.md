# AAMEC Billing System — 11-Stack Demo

Eleven implementations (5 frontends + 6 backends) of the same billing system, so any
frontend can be pointed at any backend. Every frontend defaults to the **Node.js backend**
(port 3000) for the live "swap the stack" demo.

## Backends

| Folder                | Stack                    | Port | Run |
|------------------------|--------------------------|------|-----|
| `Node-Backend/`        | Express + TypeScript      | 3000 | `npm install && npm run dev` |
| `SpringBoot-Backend/`  | Java 17 + Spring Boot 4  | 8080 | `./mvnw spring-boot:run` |
| `DotNet-Backend/`      | .NET 8 Web API           | 5000 | `dotnet run` |
| `Django-Backend/`      | Python + Django + DRF     | 8000 | see its README (venv + migrate + seed_data + runserver) |
| `Go-Backend/`          | Go (stdlib net/http)      | 8081 | `go run ./cmd/server` |
| `Laravel-Backend/`     | PHP + Laravel             | 8000 | `php artisan serve` |

All 6 implement the same contract:

```
GET  /api/products/:code
POST /api/invoices             { customerId?, items: [{ productCode, quantity }] }
GET  /api/invoices/:id
POST /api/invoices/:id/cancel
GET  /api/invoices?date=YYYY-MM-DD
```

Seeded data on every backend: products `P001`–`P004`, customer `C1001` (special price on
`P002`). CORS is wide open (`*`) everywhere. Bill numbers are assigned under a
concurrency-safe lock (see each backend's README for the specific mechanism) and are
never reused once a bill is cancelled.

## Frontends

| Folder     | Stack                              | Port | Run |
|------------|-------------------------------------|------|-----|
| `React/`   | Vite + React 18                     | 5173 | `npm install && npm run dev` |
| `NextJS/`  | Next.js (App Router, client component) | 3001 | `npm install && npm run dev` |
| `Vue/`     | Vue 3 + Pinia                        | 5174 | `npm install && npm run dev` |
| `Angular/` | Angular 18 (NgModule)                | 4200 | `npm install && npm start` |
| `Svelte/`  | SvelteKit (Svelte 5)                  | 5175 | `npm install && npm run dev` (then open `/billing`) |

Each frontend has a single `API_BASE_URL` constant (or equivalent) pointing at
`http://localhost:3000` by default — change it to demo a different backend.

## Quick start (the live demo path)

```bash
cd Node-Backend && npm install && npm run dev   # http://localhost:3000
cd React && npm install && npm run dev           # http://localhost:5173
```

Look up `P001`–`P004`, add to cart, create a bill, cancel it — all backed by the real
Node.js API, no mocks.

## Toolchains

Node, Java (JDK 17), and Python were already on this machine. The .NET 8 SDK, Go, and
PHP 8.3 + Composer were installed **user-locally** (no admin rights needed) during this
build, since winget's own installers require elevation this environment can't grant:

| Tool      | Installed to                              |
|-----------|--------------------------------------------|
| .NET SDK  | `%USERPROFILE%\.dotnet`                     |
| Go        | `%USERPROFILE%\go-sdk\go\bin`                |
| PHP       | `%USERPROFILE%\php-sdk` (`composer.phar` alongside `php.exe`) |

These are on `PATH` for this shell session (and appended to `~/.bashrc` for future Git
Bash sessions). If you open a fresh PowerShell/cmd window, add them to `PATH` yourself or
call the binaries by their full path above.
