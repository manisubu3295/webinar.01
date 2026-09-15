<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LineItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'productCode' => $this->product_code,
            'quantity' => (int) $this->quantity,
            'unitPrice' => (float) $this->unit_price,
            'taxRate' => (float) $this->tax_rate,
            'lineSubtotal' => (float) $this->line_subtotal,
            'lineTax' => (float) $this->line_tax,
            'lineTotal' => (float) $this->line_total,
        ];
    }
}
