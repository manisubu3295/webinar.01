<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerSpecialPrice extends Model
{
    protected $fillable = ['customer_id', 'product_code', 'price'];

    protected $casts = [
        'price' => 'decimal:2',
    ];
}
