namespace BillingApi.Models;

public class CreateInvoiceRequest
{
    public string? CustomerId { get; set; }
    public List<CreateInvoiceItem> Items { get; set; } = new();
}

public class CreateInvoiceItem
{
    public string ProductCode { get; set; } = "";
    public int Quantity { get; set; }
}
