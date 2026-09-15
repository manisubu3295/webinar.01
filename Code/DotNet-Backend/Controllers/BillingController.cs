using BillingApi.Models;
using BillingApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillingApi.Controllers;

[ApiController]
[Route("api")]
public class BillingController : ControllerBase
{
    private readonly BillingService _billingService;

    public BillingController(BillingService billingService)
    {
        _billingService = billingService;
    }

    [HttpGet("products/{code}")]
    public async Task<IActionResult> GetProduct(string code)
    {
        try
        {
            return Ok(await _billingService.GetProductAsync(code));
        }
        catch (ProductNotFoundException e)
        {
            return NotFound(new { error = e.Message });
        }
    }

    [HttpPost("invoices")]
    public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceRequest request)
    {
        try
        {
            var invoice = await _billingService.CreateInvoiceAsync(request);
            return StatusCode(201, invoice);
        }
        catch (ProductNotFoundException e)
        {
            return NotFound(new { error = e.Message });
        }
        catch (BillingValidationException e)
        {
            return BadRequest(new { error = e.Message });
        }
    }

    [HttpGet("invoices/{id}")]
    public async Task<IActionResult> GetInvoice(string id)
    {
        if (!Guid.TryParse(id, out var guid))
        {
            return NotFound(new { error = $"Invoice not found: {id}" });
        }
        try
        {
            return Ok(await _billingService.GetInvoiceAsync(guid));
        }
        catch (InvoiceNotFoundException e)
        {
            return NotFound(new { error = e.Message });
        }
    }

    [HttpPost("invoices/{id}/cancel")]
    public async Task<IActionResult> CancelInvoice(string id)
    {
        if (!Guid.TryParse(id, out var guid))
        {
            return NotFound(new { error = $"Invoice not found: {id}" });
        }
        try
        {
            return Ok(await _billingService.CancelInvoiceAsync(guid));
        }
        catch (InvoiceNotFoundException e)
        {
            return NotFound(new { error = e.Message });
        }
    }

    [HttpGet("invoices")]
    public async Task<IActionResult> ListInvoices([FromQuery] string? date)
    {
        return Ok(await _billingService.ListInvoicesAsync(date));
    }
}
