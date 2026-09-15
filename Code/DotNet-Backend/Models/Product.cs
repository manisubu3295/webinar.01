namespace BillingApi.Models;

public class Product
{
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public decimal Price { get; set; }

    /// <summary>e.g. 0.18 for 18% GST</summary>
    public decimal TaxRate { get; set; }
}
