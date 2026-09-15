using System.Text.Json.Serialization;
using BillingApi.Models;
using BillingApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    // camelCase + string enums so the wire format matches the shared
    // contract every backend in this demo exposes (billNumber, taxRate,
    // status: "OPEN", ...).
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    // Enum values serialize as their upper-case member name (OPEN /
    // CANCELLED) rather than camelCased, matching the other backends.
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(null));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BillingDbContext>(options => options.UseInMemoryDatabase("billingdb"));
builder.Services.AddScoped<BillingService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Wide open for this dev demo, per the shared spec.
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://localhost:{port}");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthorization();

app.MapGet("/", () => Results.Json(new
{
    service = "aamec-billing-dotnet-backend",
    status = "ok",
    endpoints = new[]
    {
        "GET  /api/products/:code",
        "POST /api/invoices",
        "GET  /api/invoices/:id",
        "POST /api/invoices/:id/cancel",
        "GET  /api/invoices?date=YYYY-MM-DD",
    },
}));

app.MapControllers();

SeedData(app);

Console.WriteLine("=================================================");
Console.WriteLine("  AAMEC Billing System - .NET backend");
Console.WriteLine($"  Listening on http://localhost:{port}");
Console.WriteLine("=================================================");

app.Run();

static void SeedData(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<BillingDbContext>();

    db.Products.AddRange(
        new Product { Code = "P001", Name = "Basmati Rice 5kg", Price = 450m, TaxRate = 0.05m },
        new Product { Code = "P002", Name = "Sunflower Oil 1L", Price = 180m, TaxRate = 0.18m },
        new Product { Code = "P003", Name = "Toothpaste 100g", Price = 55m, TaxRate = 0.18m },
        new Product { Code = "P004", Name = "Notebook 200pg", Price = 40m, TaxRate = 0.12m }
    );

    var customer = new Customer { Id = "C1001", Name = "Ramesh Kumar" };
    customer.SpecialPricing.Add(new CustomerSpecialPrice { CustomerId = "C1001", ProductCode = "P002", Price = 165m });
    db.Customers.Add(customer);

    db.SaveChanges();
    Console.WriteLine("Seeded 4 products and 1 customer.");
}
