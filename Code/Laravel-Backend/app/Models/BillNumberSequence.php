<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillNumberSequence extends Model
{
    protected $table = 'bill_number_sequence';
    public $timestamps = false;

    protected $fillable = ['last_value'];
}
