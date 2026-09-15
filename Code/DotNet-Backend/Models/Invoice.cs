using System.Text.Json.Serialization;

namespace BillingApi.Models;

public enum InvoiceStatus
{
    OPEN,
    CANCELLED,
}

public class Invoice
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string BillNumber { get; set; } = "";
    public string? CustomerId { get; set; }
    public List<LineItem> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.OPEN;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class LineItem
{
    [JsonIgnore]
    public int Id { get; set; }

    [JsonIgnore]
    public Guid InvoiceId { get; set; }

    public string ProductCode { get; set; } = "";
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TaxRate { get; set; }
    public decimal LineSubtotal { get; set; }
    public decimal LineTax { get; set; }
    public decimal LineTotal { get; set; }
}

/// <summary>
/// A single-row counter table. See BillingService.NextBillNumberAsync() for
/// why this is locked with a SemaphoreSlim rather than just incremented.
/// </summary>
public class BillNumberSequence
{
    public int Id { get; set; } = 1;
    public int LastValue { get; set; } = 1000;
}
