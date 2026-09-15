namespace BillingApi.Services;

public class ProductNotFoundException : Exception
{
    public ProductNotFoundException(string code) : base($"Product not found: {code}")
    {
    }
}

public class InvoiceNotFoundException : Exception
{
    public InvoiceNotFoundException(string id) : base($"Invoice not found: {id}")
    {
    }
}

public class BillingValidationException : Exception
{
    public BillingValidationException(string message) : base(message)
    {
    }
}
