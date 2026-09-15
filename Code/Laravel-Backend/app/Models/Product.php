<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['code', 'name', 'price', 'tax_rate'];

    protected $casts = [
        'price' => 'decimal:2',
        'tax_rate' => 'decimal:4',
    ];
}
