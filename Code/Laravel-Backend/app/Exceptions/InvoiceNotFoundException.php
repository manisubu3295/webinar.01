<?php

namespace App\Exceptions;

use Exception;

class InvoiceNotFoundException extends Exception
{
    public function __construct(string $id)
    {
        parent::__construct("Invoice not found: {$id}");
    }
}
