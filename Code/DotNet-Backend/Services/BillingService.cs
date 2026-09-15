using BillingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BillingApi.Services;

public class BillingService
{
    private const decimal DefaultTaxRate = 0.18m; // 18% GST unless a product overrides it

    /// <summary>
    /// EF Core's InMemory provider doesn't implement real row locking (no
    /// SELECT ... FOR UPDATE), so a DB transaction alone can't serialize two
    /// concurrent requests reading/incrementing the shared bill-number
    /// counter. We use a process-wide SemaphoreSlim(1,1) around "read
    /// counter -> increment -> save" instead — the same guarantee a
    /// `lock` block gives, but usable with `await` inside the critical
    /// section. Pointed at a real database (SQL Server, Postgres), you'd
    /// swap this for a transaction + row lock, same as the other backends
    /// in this demo.
    /// </summary>
    private static readonly SemaphoreSlim BillNumberLock = new(1, 1);

    private readonly BillingDbContext _db;

    public BillingService(BillingDbContext db)
    {
        _db = db;
    }

    public async Task<Product> GetProductAsync(string code)
    {
        var product = await _db.Products.FindAsync(code.ToUpperInvariant());
        if (product is null)
        {
            throw new ProductNotFoundException(code);
        }
        return product;
    }

    public async Task<Invoice> GetInvoiceAsync(Guid id)
    {
        var invoice = await _db.Invoices.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == id);
        if (invoice is null)
        {
            throw new InvoiceNotFoundException(id.ToString());
        }
        return invoice;
    }

    public async Task<List<Invoice>> ListInvoicesAsync(string? date)
    {
        var query = _db.Invoices.Include(i => i.Items).AsQueryable();
        if (!string.IsNullOrWhiteSpace(date))
        {
            query = query.Where(i => i.CreatedAt.ToString("yyyy-MM-dd") == date);
        }
        return await query.OrderByDescending(i => i.CreatedAt).ToListAsync();
    }

    public async Task<Invoice> CreateInvoiceAsync(CreateInvoiceRequest request)
    {
        if (request.Items is null || request.Items.Count == 0)
        {
            throw new BillingValidationException("At least one line item is required");
        }
        foreach (var item in request.Items)
        {
            if (string.IsNullOrWhiteSpace(item.ProductCode) || item.Quantity <= 0)
            {
                throw new BillingValidationException("Each item needs a productCode and a positive quantity");
            }
        }

        Customer? customer = null;
        if (!string.IsNullOrWhiteSpace(request.CustomerId))
        {
            customer = await _db.Customers.Include(c => c.SpecialPricing)
                .FirstOrDefaultAsync(c => c.Id == request.CustomerId);
            if (customer is null)
            {
                throw new BillingValidationException($"Unknown customerId: {request.CustomerId}");
            }
        }

        // Resolve pricing before ever touching the shared bill-number lock,
        // so a bad product code fails fast.
        var lineItems = new List<LineItem>();
        decimal subtotal = 0, tax = 0;
        foreach (var item in request.Items)
        {
            var product = await GetProductAsync(item.ProductCode);
            var special = customer?.SpecialPricing.FirstOrDefault(sp => sp.ProductCode == product.Code);
            var unitPrice = special?.Price ?? product.Price;
            var taxRate = product.TaxRate == 0 ? DefaultTaxRate : product.TaxRate;
            var lineSubtotal = Math.Round(unitPrice * item.Quantity, 2, MidpointRounding.AwayFromZero);
            var lineTax = Math.Round(lineSubtotal * taxRate, 2, MidpointRounding.AwayFromZero);
            subtotal += lineSubtotal;
            tax += lineTax;
            lineItems.Add(new LineItem
            {
                ProductCode = product.Code,
                Quantity = item.Quantity,
                UnitPrice = unitPrice,
                TaxRate = taxRate,
                LineSubtotal = lineSubtotal,
                LineTax = lineTax,
                LineTotal = lineSubtotal + lineTax,
            });
        }
        subtotal = Math.Round(subtotal, 2, MidpointRounding.AwayFromZero);
        tax = Math.Round(tax, 2, MidpointRounding.AwayFromZero);

        await BillNumberLock.WaitAsync();
        try
        {
            var billNumber = await NextBillNumberAsync();
            var invoice = new Invoice
            {
                BillNumber = billNumber,
                CustomerId = customer?.Id,
                Subtotal = subtotal,
                Tax = tax,
                Total = subtotal + tax,
                Status = InvoiceStatus.OPEN,
            };
            foreach (var li in lineItems)
            {
                li.InvoiceId = invoice.Id;
                invoice.Items.Add(li);
            }
            _db.Invoices.Add(invoice);
            await _db.SaveChangesAsync();
            return invoice;
        }
        finally
        {
            BillNumberLock.Release();
        }
    }

    public async Task<Invoice> CancelInvoiceAsync(Guid id)
    {
        var invoice = await GetInvoiceAsync(id);
        // Idempotent: cancelling an already-cancelled bill just returns it.
        // The bill number is never reassigned or reused (GST compliance).
        invoice.Status = InvoiceStatus.CANCELLED;
        await _db.SaveChangesAsync();
        return invoice;
    }

    private async Task<string> NextBillNumberAsync()
    {
        var seq = await _db.BillNumberSequences.FindAsync(1);
        if (seq is null)
        {
            seq = new BillNumberSequence();
            _db.BillNumberSequences.Add(seq);
        }
        seq.LastValue++;
        await _db.SaveChangesAsync();
        return $"INV-{seq.LastValue:D6}";
    }
}
