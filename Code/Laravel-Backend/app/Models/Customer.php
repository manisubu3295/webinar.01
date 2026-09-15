<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'name'];

    public function specialPrices(): HasMany
    {
        return $this->hasMany(CustomerSpecialPrice::class, 'customer_id');
    }
}
