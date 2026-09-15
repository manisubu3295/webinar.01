<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Invoice extends Model
{
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false; // created_at only, defaulted by the DB (useCurrent())

    protected $fillable = ['id', 'bill_number', 'customer_id', 'subtotal', 'tax', 'total', 'status', 'created_at'];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Invoice $invoice) {
            $invoice->id ??= (string) Str::uuid();
        });
    }

    public function items(): HasMany
    {
        return $this->hasMany(LineItem::class, 'invoice_id');
    }
}
