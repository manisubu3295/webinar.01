// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const techDetails = {
  react: {
    name: "React",
    runLang: "simulated",
    runnable:
`console.log("Hello from React!");
console.log("Rendering <h1>Hello, Billing System</h1>");`,
    demoUrl: "http://localhost:8080/api/invoices/1",
    tagline: "A component-based UI library. You build small, reusable pieces of interface and compose them into full screens.",
    whatIsIt: "A JavaScript library for building user interfaces out of small, reusable components. You describe what the UI should look like for a given state, and React updates the page for you.",
    realExample: "This build would use React for the billing screen counter staff use all day — small, reusable pieces like the bill card and customer search, updating instantly as a sale happens. It's proven at far larger scale too: Facebook and Instagram are built on it.",
    steps: [
      "Scaffold a project with Vite: npm create vite@latest billing-ui -- --template react",
      "Build UI as components — one function, one piece of interface",
      "Lift shared data (like the current invoice) up to a parent component or a store",
      "Fetch data from your backend API with fetch() or a library like axios"
    ],
    folder:
`src/
  components/
    BillCard.jsx
    InvoiceList.jsx
    CustomerSearch.jsx
  pages/
    Dashboard.jsx
    BillingScreen.jsx
  hooks/
    useBilling.js
  api/
    billingApi.js
  App.jsx
  main.jsx`,
    code:
`function BillCard({ invoice }) {
  <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
  return (
    &lt;div className="bill-card"&gt;
      &lt;h3&gt;{invoice.customerName}&lt;/h3&gt;
      &lt;p&gt;Total: {invoice.total}&lt;/p&gt;
    &lt;/div&gt;
  );
}`
  },
  angular: {
    name: "Angular",
    runLang: "simulated",
    runnable:
`console.log("Hello from Angular!");
console.log("Bootstrapping AppComponent...");`,
    demoUrl: "http://localhost:8080/api/invoices/1",
    tagline: "A full, opinionated framework. Comes with routing, forms, and dependency injection built in — good for teams that want structure enforced by the tool.",
    whatIsIt: "A complete, opinionated framework for building web applications, maintained by Google. It bundles routing, forms, and dependency injection out of the box, so large teams get consistent structure without deciding everything themselves.",
    realExample: "Google itself uses Angular for products like the Google Ads management console, where a large team needs shared, enforced structure across a huge codebase.",
    steps: [
      "Scaffold with the Angular CLI: ng new billing-ui",
      "Generate a feature module per domain area: ng generate module billing",
      "Services handle API calls and shared state, injected into components",
      "Templates use Angular's own binding syntax, not JSX"
    ],
    folder:
`src/
  app/
    billing/
      billing.component.ts
      billing.component.html
      billing.service.ts
      billing.module.ts
    customer/
      customer.component.ts
    shared/
      models/
        invoice.model.ts
  main.ts`,
    code:
`@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html'
})
export class BillCardComponent {
  @Input() invoice!: Invoice;
  <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
}`
  },
  vue: {
    name: "Vue",
    runLang: "simulated",
    runnable:
`console.log("Hello from Vue!");`,
    demoUrl: "http://localhost:8080/api/invoices/1",
    tagline: "An approachable framework with a gentle learning curve. Templates look close to plain HTML, and reactivity is built in without much ceremony.",
    whatIsIt: "A progressive framework that sits between a simple library and a full framework. You can add it to a single page incrementally, or scale it up to run an entire application.",
    realExample: "Alibaba and Xiaomi use Vue extensively across their e-commerce platforms, especially across China, where it has particularly strong adoption.",
    steps: [
      "Scaffold with: npm create vue@latest billing-ui",
      "Components are single-file .vue files: template, script, and style together",
      "Use Pinia (or Vuex) for shared state like the active invoice",
      "Vue Router handles navigation between screens"
    ],
    folder:
`src/
  components/
    BillCard.vue
    InvoiceList.vue
  views/
    Dashboard.vue
    BillingScreen.vue
  store/
    billing.js
  api/
    billingApi.js
  App.vue
  main.js`,
    code:
`&lt;template&gt;
  &lt;div class="bill-card"&gt;
    &lt;h3&gt;{{ invoice.customerName }}&lt;/h3&gt;
    &lt;p&gt;Total: {{ invoice.total }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script setup&gt;
defineProps(['invoice'])
<span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
&lt;/script&gt;`
  },
  svelte: {
    name: "Svelte",
    runLang: "simulated",
    runnable:
`console.log("Hello from Svelte!");`,
    demoUrl: "http://localhost:8080/api/invoices/1",
    tagline: "A compiler, not a runtime framework. Your component code compiles down to small, fast vanilla JavaScript with no virtual DOM overhead.",
    whatIsIt: "A compiler, not a runtime framework. Instead of shipping a framework to the browser, Svelte compiles your components into small, plain JavaScript at build time, so there's less code to download and run.",
    realExample: "The New York Times has used Svelte for interactive articles and data visualizations, where every kilobyte of load time matters for readers.",
    steps: [
      "Scaffold with: npm create svelte@latest billing-ui",
      "Each .svelte file is a self-contained component: markup, logic, and style",
      "Reactivity uses plain JavaScript variables with the $: label, not hooks",
      "Svelte stores hold state shared across components (like the active bill)"
    ],
    folder:
`src/
  lib/
    components/
      BillCard.svelte
      InvoiceList.svelte
    stores/
      billing.js
  routes/
    +page.svelte
    billing/
      +page.svelte
  app.html`,
    code:
`&lt;script&gt;
  export let invoice;
  <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
&lt;/script&gt;

&lt;div class="bill-card"&gt;
  &lt;h3&gt;{invoice.customerName}&lt;/h3&gt;
  &lt;p&gt;Total: {invoice.total}&lt;/p&gt;
&lt;/div&gt;`
  },
  nextjs: {
    name: "Next.js",
    runLang: "simulated",
    runnable:
`console.log("Hello from Next.js!");`,
    demoUrl: "http://localhost:3000/api/invoices/1",
    tagline: "A React meta-framework: file-based routing, server-side rendering, and API routes bundled together. Good when you want a full-stack React app with less setup.",
    whatIsIt: "A React framework that adds server-side rendering, file-based routing, and API routes on top of React, so pages can be fast and SEO-friendly without extra configuration.",
    realExample: "TikTok's web version and Twitch's marketing pages are both built with Next.js, taking advantage of fast page loads for content that needs to rank well in search.",
    steps: [
      "Scaffold with: npx create-next-app@latest billing-ui",
      "Folders under app/ define your routes automatically",
      "API routes live alongside your UI code — no separate backend needed for simple cases",
      "Choose server or client components depending on whether the piece needs interactivity"
    ],
    folder:
`app/
  billing/
    page.tsx
    layout.tsx
  api/
    invoices/
      route.ts
  components/
    BillCard.tsx
    InvoiceList.tsx
next.config.js`,
    code:
`export default function BillCard({ invoice }) {
  <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
  return (
    &lt;div className="bill-card"&gt;
      &lt;h3&gt;{invoice.customerName}&lt;/h3&gt;
      &lt;p&gt;Total: {invoice.total}&lt;/p&gt;
    &lt;/div&gt;
  );
}`
  },
  java: {
    name: "Java / Spring",
    runLang: "simulated",
    runnable:
`public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
    demoUrl: "http://localhost:8080/api/invoices/1",
    tagline: "A verbose but battle-tested platform. Spring Boot handles wiring, configuration, and conventions so the team can focus on business logic.",
    whatIsIt: "A statically-typed, object-oriented language, paired with the Spring framework for building enterprise web applications, REST APIs, and microservices with strong tooling and long-term support.",
    realExample: "Most large banks, including HSBC and Standard Chartered, run core banking and payment systems on Java, precisely because it's stable enough to run untouched for a decade.",
    steps: [
      "Scaffold with Spring Initializr (start.spring.io)",
      "Controllers receive HTTP requests, services hold business logic, repositories talk to the database",
      "Spring Data JPA generates most repository code for you from an interface",
      "Package by feature (billing, customer) rather than by layer, once the project grows"
    ],
    folder:
`src/main/java/com/aadhirai/billing/
  controller/
    BillingController.java
  service/
    BillingService.java
  repository/
    InvoiceRepository.java
  model/
    Invoice.java
  BillingApplication.java`,
    code:
`@RestController
@RequestMapping("/api/invoices")
public class BillingController {
    @Autowired private BillingService billingService;

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable Long id) {
        <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
        return billingService.findById(id);
    }
}`
  },
  csharp: {
    name: "C# / .NET",
    runLang: "simulated",
    runnable:
`Console.WriteLine("Hello from C#!");`,
    demoUrl: "http://localhost:5000/api/invoices/1",
    tagline: "Shares Java's structure and strengths, with modern tooling and full cross-platform support via .NET.",
    whatIsIt: "Microsoft's statically-typed language, paired with the .NET runtime. Offers similar strengths to Java, with deep integration into Windows-based enterprise environments and Azure cloud services.",
    realExample: "Stack Overflow itself runs on .NET, handling millions of requests a day on a relatively small server footprint.",
    steps: [
      "Scaffold with: dotnet new webapi -n BillingApi",
      "Controllers handle routes, services hold logic, Entity Framework Core talks to the database",
      "Dependency injection is built into the framework, registered in Program.cs",
      "Use DTOs to shape what actually goes over the wire to the frontend"
    ],
    folder:
`BillingApi/
  Controllers/
    BillingController.cs
  Services/
    BillingService.cs
  Models/
    Invoice.cs
  Program.cs`,
    code:
`[ApiController]
[Route("api/invoices")]
public class BillingController : ControllerBase {
    private readonly IBillingService _billingService;

    [HttpGet("{id}")]
    public Invoice GetInvoice(int id) {
        <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
        return _billingService.FindById(id);
    }
}`
  },
  python: {
    name: "Python / Django",
    runLang: "real-python",
    runnable:
`print("Hello from Python!")\nprint("This is really running, via Pyodide.")`,
    demoUrl: "http://localhost:8000/api/invoices/1",
    tagline: "Fastest path to a working system. Django's admin panel and ORM handle a lot of the boilerplate for you out of the box.",
    whatIsIt: "A readable, high-level language paired with Django, a batteries-included web framework that includes an admin panel, ORM, and authentication system out of the box.",
    realExample: "Instagram's backend runs on Django, handling billions of photo uploads and feed requests every day.",
    steps: [
      "Scaffold with: django-admin startproject billing_system",
      "Each app (like 'billing') has its own models, views, and URLs",
      "The ORM turns Python classes into database tables automatically",
      "Django REST Framework adds a clean API layer on top of your models"
    ],
    folder:
`billing/
  models.py
  views.py
  serializers.py
  urls.py
  admin.py
billing_system/
  settings.py
  urls.py
manage.py`,
    code:
`class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def retrieve(self, request, pk=None):
        <span class="code-placeholder"># TODO: replace with your real billing-system logic</span>
        return super().retrieve(request, pk)`
  },
  node: {
    name: "Node / TypeScript",
    runLang: "real-js",
    runnable:
`console.log("Hello from Node!");\nconsole.log("This is really running, right in your browser.");`,
    demoUrl: "http://localhost:3000/api/invoices/1",
    tagline: "One language across the whole stack. Express (or Fastify) plus TypeScript gives you a fast, flexible backend with strong typing.",
    whatIsIt: "JavaScript running outside the browser, on the server. TypeScript adds static types on top, catching errors before code even runs — letting one team use the same language on both frontend and backend.",
    realExample: "Netflix's server-side rendering layer runs on Node.js, chosen specifically so frontend and backend engineers could share code and skills.",
    steps: [
      "Scaffold with: npm init && npm install express typescript",
      "Routes map URLs to controller functions",
      "Controllers call services, services call your database layer (Prisma, TypeORM, etc.)",
      "Keep request/response types shared with the frontend where possible"
    ],
    folder:
`src/
  routes/
    billing.routes.ts
  controllers/
    billing.controller.ts
  services/
    billing.service.ts
  models/
    invoice.model.ts
  server.ts`,
    code:
`export async function getInvoice(req: Request, res: Response) {
  <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
  const invoice = await billingService.findById(req.params.id);
  res.json(invoice);
}`
  },
  go: {
    name: "Go",
    runLang: "simulated",
    runnable:
`package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
    demoUrl: "http://localhost:8081/api/invoices/1",
    tagline: "Compiles to a single binary with no runtime dependency. Simple, fast, and easy to operate — a strong fit for infrastructure-heavy systems.",
    whatIsIt: "A compiled language designed by Google for simplicity and performance. Compiles to a single binary with no external dependencies, making it easy to deploy and operate.",
    realExample: "Docker and Kubernetes, the container tools that run most of the modern internet, are themselves written in Go.",
    steps: [
      "Scaffold with: go mod init billing-service",
      "Handlers are plain functions matched to routes (net/http, or a router like chi)",
      "Structs represent your data; no ORM magic by default — most teams write SQL directly or use a thin query builder",
      "Everything compiles into one deployable binary, no separate runtime needed"
    ],
    folder:
`cmd/
  server/
    main.go
internal/
  billing/
    handler.go
    service.go
    model.go
  db/
    postgres.go`,
    code:
`func GetInvoice(w http.ResponseWriter, r *http.Request) {
    <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
    id := chi.URLParam(r, "id")
    invoice, _ := billingService.FindByID(id)
    json.NewEncoder(w).Encode(invoice)
}`
  },
  php: {
    name: "PHP / Laravel",
    runLang: "simulated",
    runnable:
`<?php\necho "Hello from PHP!";\n?>`,
    demoUrl: "http://localhost:8000/api/invoices/1",
    tagline: "The cheapest hosting footprint and a huge installed base across SMEs. Laravel adds real structure — routing, ORM, and templating — on top of plain PHP.",
    whatIsIt: "A scripting language built specifically for the web, paired with Laravel, a modern framework that adds clean routing, an ORM, and templating on top of plain PHP.",
    realExample: "Wikipedia's core software, MediaWiki, is built in PHP, serving one of the most visited websites on the internet.",
    steps: [
      "Scaffold with: composer create-project laravel/laravel billing-system",
      "Routes live in routes/web.php, mapped to controller methods",
      "Eloquent is Laravel's ORM — models map directly to database tables",
      "Blade templates handle server-rendered views if you're not using a separate frontend"
    ],
    folder:
`app/
  Http/
    Controllers/
      BillingController.php
  Models/
    Invoice.php
routes/
  web.php
database/
  migrations/`,
    code:
`class BillingController extends Controller {
    public function show($id) {
        <span class="code-placeholder">// TODO: replace with your real billing-system logic</span>
        $invoice = Invoice::findOrFail($id);
        return view('billing.show', compact('invoice'));
    }
}`
  },
  postgresql: {
    name: "PostgreSQL",
    demoUrl: "http://localhost:8080/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Get invoice by bill number", query: "SELECT * FROM invoices WHERE bill_number = 'INV-00123';", response: { id: 1, bill_number: "INV-00123", customer_id: 88, subtotal: 90.00, tax: 16.20, total: 106.20, status: "OPEN", created_at: "2026-09-18T10:32:00Z" } },
      { label: "List today's invoices", query: "SELECT id, bill_number, total FROM invoices WHERE created_at::date = CURRENT_DATE;", response: [ { id: 1, bill_number: "INV-00123", total: 106.20 }, { id: 2, bill_number: "INV-00124", total: 45.00 } ] }
    ],
    tagline: "An open-source relational database built for correctness. The default choice for backend systems that must never lose track of a number.",
    whatIsIt: "An open-source relational database that stores data in strict tables with enforced relationships, and guarantees transactions are always fully completed or fully rolled back.",
    realExample: "Instagram uses PostgreSQL to store core data like user accounts and relationships, where correctness matters more than raw speed.",
    steps: [
      "Run locally with Docker: docker run -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres",
      "Connect with a client like psql, TablePlus, or pgAdmin",
      "Design tables with explicit relationships (foreign keys) up front",
      "Add indexes on columns you'll search by often, like bill number"
    ],
    structureLabel: "Schema",
    folder:
`-- invoices table
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  bill_number VARCHAR(20)
    UNIQUE NOT NULL,
  customer_id INT
    REFERENCES customers(id),
  subtotal NUMERIC(10,2),
  tax NUMERIC(10,2),
  total NUMERIC(10,2),
  status VARCHAR(10)
    DEFAULT 'OPEN',
  created_at TIMESTAMP
    DEFAULT now()
);`,
    code:
`SELECT * FROM invoices
WHERE bill_number = $1;

<span class="code-placeholder">-- TODO: replace with your real billing-system queries</span>`
  },
  mysql: {
    name: "MySQL",
    demoUrl: "http://localhost:8080/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Get invoice by bill number", query: "SELECT * FROM invoices WHERE bill_number = 'INV-00123';", response: { id: 1, bill_number: "INV-00123", customer_id: 88, subtotal: 90.00, tax: 16.20, total: 106.20, status: "OPEN", created_at: "2026-09-18 10:32:00" } },
      { label: "Count today's invoices", query: "SELECT COUNT(*) AS total FROM invoices WHERE DATE(created_at) = CURDATE();", response: { total: 2 } }
    ],
    tagline: "The most widely deployed open-source relational database. Cheap to host, huge community, the backbone of countless SME systems.",
    whatIsIt: "The most widely deployed open-source relational database in the world, known for being fast to set up and cheap to host.",
    realExample: "Facebook's original architecture, and much of WordPress, which powers over 40% of all websites, runs on MySQL.",
    steps: [
      "Run locally with Docker: docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=pass mysql",
      "Connect with MySQL Workbench or the mysql CLI",
      "Define tables with the InnoDB engine for proper transaction support",
      "Watch for character-set and collation issues on multi-language data"
    ],
    structureLabel: "Schema",
    folder:
`-- invoices table
CREATE TABLE invoices (
  id INT AUTO_INCREMENT
    PRIMARY KEY,
  bill_number VARCHAR(20)
    UNIQUE NOT NULL,
  customer_id INT,
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2),
  status VARCHAR(10)
    DEFAULT 'OPEN',
  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;`,
    code:
`SELECT * FROM invoices
WHERE bill_number = ?;

<span class="code-placeholder">-- TODO: replace with your real billing-system queries</span>`
  },
  mssql: {
    name: "MS SQL Server",
    demoUrl: "http://localhost:5000/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Get invoice by bill number", query: "SELECT * FROM dbo.Invoices WHERE BillNumber = 'INV-00123';", response: { Id: 1, BillNumber: "INV-00123", CustomerId: 88, Subtotal: 90.00, Tax: 16.20, Total: 106.20, Status: "OPEN", CreatedAt: "2026-09-18T10:32:00" } },
      { label: "List open invoices", query: "SELECT Id, BillNumber, Total FROM dbo.Invoices WHERE Status = 'OPEN';", response: [ { Id: 1, BillNumber: "INV-00123", Total: 106.20 } ] }
    ],
    tagline: "Microsoft's enterprise relational database. Deep .NET integration and strong tooling, common in large Windows-based enterprises.",
    whatIsIt: "Microsoft's enterprise relational database, tightly integrated with .NET applications and Windows Server environments, commonly bundled into enterprise licensing deals.",
    realExample: "Large enterprises and many government agencies running Windows-based infrastructure use SQL Server as their default database.",
    steps: [
      "Run locally with Docker: docker run -p 1433:1433 -e ACCEPT_EULA=Y -e SA_PASSWORD=Pass@word1 mcr.microsoft.com/mssql/server",
      "Connect with SQL Server Management Studio (SSMS) or Azure Data Studio",
      "Define tables inside an explicit schema, like dbo.Invoices",
      "Use stored procedures for complex, reusable business logic"
    ],
    structureLabel: "Schema",
    folder:
`-- dbo.Invoices table
CREATE TABLE dbo.Invoices (
  Id INT IDENTITY
    PRIMARY KEY,
  BillNumber NVARCHAR(20)
    UNIQUE NOT NULL,
  CustomerId INT,
  Subtotal DECIMAL(10,2),
  Tax DECIMAL(10,2),
  Total DECIMAL(10,2),
  Status NVARCHAR(10)
    DEFAULT 'OPEN',
  CreatedAt DATETIME
    DEFAULT GETDATE()
);`,
    code:
`SELECT * FROM dbo.Invoices
WHERE BillNumber = @billNumber;

<span class="code-placeholder">-- TODO: replace with your real billing-system queries</span>`
  },
  oracle: {
    name: "Oracle",
    demoUrl: "http://localhost:8080/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Get invoice by bill number", query: "SELECT * FROM invoices WHERE bill_number = 'INV-00123';", response: { ID: 1, BILL_NUMBER: "INV-00123", CUSTOMER_ID: 88, SUBTOTAL: 90.00, TAX: 16.20, TOTAL: 106.20, STATUS: "OPEN", CREATED_AT: "18-SEP-26" } },
      { label: "Next invoice sequence value", query: "SELECT invoice_seq.NEXTVAL FROM dual;", response: { NEXTVAL: 42 } }
    ],
    tagline: "The dominant database in large, legacy enterprise systems — banking, telecom, government. Powerful and battle-tested, but heavier to operate.",
    whatIsIt: "A high-end relational database built for the largest, most demanding enterprise workloads, including banking, telecom, and airlines, with decades of tooling for reliability at massive scale.",
    realExample: "Most major airlines' reservation systems, and a large share of global banking core systems, run on Oracle databases.",
    steps: [
      "Run locally with Oracle's official Docker image, or use a free-tier Oracle Cloud instance",
      "Connect with SQL Developer or SQL*Plus",
      "Tables live inside a schema tied to a database user",
      "Use a sequence for auto-incrementing IDs — Oracle has no AUTO_INCREMENT"
    ],
    structureLabel: "Schema",
    folder:
`-- sequence + invoices table
CREATE SEQUENCE invoice_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE invoices (
  id NUMBER PRIMARY KEY,
  bill_number VARCHAR2(20)
    UNIQUE NOT NULL,
  customer_id NUMBER,
  subtotal NUMBER(10,2),
  tax NUMBER(10,2),
  total NUMBER(10,2),
  status VARCHAR2(10)
    DEFAULT 'OPEN',
  created_at DATE
    DEFAULT SYSDATE
);`,
    code:
`SELECT * FROM invoices
WHERE bill_number = :billNumber;

<span class="code-placeholder">-- TODO: replace with your real billing-system queries</span>`
  },
  mongodb: {
    name: "MongoDB",
    demoUrl: "http://localhost:8080/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Find invoice by bill number", query: 'db.invoices.findOne({ billNumber: "INV-00123" });', response: { billNumber: "INV-00123", customerId: "cust_88", items: [ { productCode: "SKU001", quantity: 2, unitPrice: 45.00 } ], subtotal: 90.00, tax: 16.20, total: 106.20, status: "OPEN", createdAt: "2026-09-18T10:32:00Z" } },
      { label: "Count open invoices", query: 'db.invoices.countDocuments({ status: "OPEN" });', response: { count: 2 } }
    ],
    tagline: "A document database. Stores flexible, JSON-like records instead of rigid tables — good for data whose shape varies or changes often.",
    whatIsIt: "A document database that stores data as flexible, JSON-like records instead of rigid tables, so a record's shape can change without redesigning a schema.",
    realExample: "eBay uses MongoDB for parts of its product catalog, where very different product types naturally have very different attributes.",
    steps: [
      "Run locally with Docker: docker run -p 27017:27017 mongo",
      "Connect with mongosh or MongoDB Compass",
      "Design collections around how you'll read data, not strict normalization",
      "Add indexes on fields you'll query often, like billNumber"
    ],
    structureLabel: "Document shape",
    folder:
`// invoices collection
// one document per bill
{
  billNumber: "INV-00123",
  customerId: "cust_88",
  items: [
    {
      productCode: "SKU001",
      quantity: 2,
      unitPrice: 45.00
    }
  ],
  subtotal: 90.00,
  tax: 16.20,
  total: 106.20,
  status: "OPEN",
  createdAt: ISODate("2026-09-18")
}`,
    code:
`db.invoices.findOne({
  billNumber: "INV-00123"
});

<span class="code-placeholder">// TODO: replace with your real billing-system queries</span>`
  },
  redis: {
    name: "Redis",
    demoUrl: "http://localhost:8080/api/invoices/1",
    demoNote: "This calls your billing API's query endpoint — point the backend at this database, then Run to prove it live.",
    dbQueries: [
      { label: "Get cached product price", query: "GET product:SKU001", response: { name: "Rice 1kg", price: 45.00 } },
      { label: "Check key exists", query: "EXISTS product:SKU001", response: { exists: 1 } }
    ],
    tagline: "An in-memory key-value store. Near-instant lookups by a key you already know — used for caching and sessions, never as your only source of truth.",
    whatIsIt: "An in-memory key-value store, meaning data lives in RAM instead of on disk, making lookups extremely fast. Used for caching, never as a permanent database.",
    realExample: "Twitter uses Redis to cache timelines, so reloading your feed doesn't require querying the main database every single time.",
    steps: [
      "Run locally with Docker: docker run -p 6379:6379 redis",
      "Connect with redis-cli or a client library",
      "Store short-lived, frequently-read data (like a product's price) with an expiry",
      "Never treat Redis as your permanent record — always back it with a real database"
    ],
    structureLabel: "Key pattern",
    folder:
`# Cached product lookup
product:SKU001 -> {
  "name": "Rice 1kg",
  "price": 45.00
}
TTL: 300 seconds`,
    code:
`GET product:SKU001

<span class="code-placeholder"># TODO: replace with your real billing-system cache keys</span>`
  }
} as const;
