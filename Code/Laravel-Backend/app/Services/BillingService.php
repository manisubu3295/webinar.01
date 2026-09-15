<?php

namespace App\Services;

use App\Exceptions\BillingValidationException;
use App\Exceptions\InvoiceNotFoundException;
use App\Exceptions\ProductNotFoundException;
use App\Models\BillNumberSequence;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\LineItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class BillingService
{
    private const DEFAULT_TAX_RATE = 0.18; // 18% GST unless a product overrides it

    public function getProduct(string $code): Product
    {
        $product = Product::find(strtoupper($code));
        if (! $product) {
            throw new ProductNotFoundException($code);
        }
        return $product;
    }

    public function getInvoice(string $id): Invoice
    {
        $invoice = Invoice::with('items')->find($id);
        if (! $invoice) {
            throw new InvoiceNotFoundException($id);
        }
        return $invoice;
    }

    public function listInvoices(?string $date)
    {
        $query = Invoice::with('items')->orderByDesc('created_at');
        if ($date) {
            $query->whereDate('created_at', $date);
        }
        return $query->get();
    }

    /**
     * Pricing is resolved before the transaction that touches the shared
     * bill-number counter, so a bad product code fails fast without ever
     * acquiring the counter row's lock.
     */
    public function createInvoice(?string $customerId, array $items): Invoice
    {
        if (empty($items)) {
            throw new BillingValidationException('At least one line item is required');
        }
        foreach ($items as $item) {
            if (empty($item['productCode']) || ($item['quantity'] ?? 0) <= 0) {
                throw new BillingValidationException('Each item needs a productCode and a positive quantity');
            }
        }

        $customer = null;
        if ($customerId) {
            $customer = Customer::with('specialPrices')->find($customerId);
            if (! $customer) {
                throw new BillingValidationException("Unknown customerId: {$customerId}");
            }
        }

        $lineItems = [];
        $subtotal = 0.0;
        $tax = 0.0;
        foreach ($items as $item) {
            $product = $this->getProduct($item['productCode']);
            $special = $customer?->specialPrices->firstWhere('product_code', $product->code);
            $unitPrice = $special ? (float) $special->price : (float) $product->price;
            $taxRate = (float) $product->tax_rate ?: self::DEFAULT_TAX_RATE;
            $lineSubtotal = round($unitPrice * (int) $item['quantity'], 2);
            $lineTax = round($lineSubtotal * $taxRate, 2);
            $subtotal += $lineSubtotal;
            $tax += $lineTax;
            $lineItems[] = [
                'product_code' => $product->code,
                'quantity' => (int) $item['quantity'],
                'unit_price' => $unitPrice,
                'tax_rate' => $taxRate,
                'line_subtotal' => $lineSubtotal,
                'line_tax' => $lineTax,
                'line_total' => round($lineSubtotal + $lineTax, 2),
            ];
        }
        $subtotal = round($subtotal, 2);
        $tax = round($tax, 2);

        return DB::transaction(function () use ($customer, $lineItems, $subtotal, $tax) {
            $billNumber = $this->nextBillNumber();

            $invoice = Invoice::create([
                'bill_number' => $billNumber,
                'customer_id' => $customer?->id,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => round($subtotal + $tax, 2),
                'status' => 'OPEN',
                // $timestamps is disabled on Invoice (no updated_at column),
                // so set created_at explicitly rather than relying on the
                // DB's useCurrent() default, which the in-memory model
                // wouldn't see until a fresh SELECT.
                'created_at' => now(),
            ]);

            foreach ($lineItems as $li) {
                $invoice->items()->create($li);
            }

            return $invoice->load('items');
        });
    }

    public function cancelInvoice(string $id): Invoice
    {
        $invoice = $this->getInvoice($id);
        // Idempotent: cancelling an already-cancelled bill just returns it.
        // The bill number is never reassigned or reused (GST compliance).
        $invoice->status = 'CANCELLED';
        $invoice->save();
        return $invoice;
    }

    /**
     * Bill numbers must never collide, even under concurrent requests. We
     * keep a single-row counter table and, inside a transaction,
     * lockForUpdate() that row before incrementing it — the SQL equivalent
     * of SELECT ... FOR UPDATE. A second concurrent request blocks on that
     * row lock until the first transaction commits, so two requests can
     * never compute the same "next" bill number. SQLite (this demo's
     * default) serializes writers at the database-file level anyway, but
     * this same code works unchanged against Postgres/MySQL in production.
     */
    private function nextBillNumber(): string
    {
        $seq = BillNumberSequence::query()->lockForUpdate()->find(1);
        $seq->last_value += 1;
        $seq->save();
        return sprintf('INV-%06d', $seq->last_value);
    }
}
