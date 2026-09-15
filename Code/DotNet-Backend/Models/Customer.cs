namespace BillingApi.Models;

public class Customer
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public List<CustomerSpecialPrice> SpecialPricing { get; set; } = new();
}

/// <summary>A negotiated unit price for one product, for one regular customer.</summary>
public class CustomerSpecialPrice
{
    public int Id { get; set; }
    public string CustomerId { get; set; } = "";
    public string ProductCode { get; set; } = "";
    public decimal Price { get; set; }
}
