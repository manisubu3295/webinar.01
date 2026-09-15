<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineItem extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'invoice_id', 'product_code', 'quantity', 'unit_price',
        'tax_rate', 'line_subtotal', 'line_tax', 'line_total',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'tax_rate' => 'decimal:4',
        'line_subtotal' => 'decimal:2',
        'line_tax' => 'decimal:2',
        'line_total' => 'decimal:2',
    ];
}
