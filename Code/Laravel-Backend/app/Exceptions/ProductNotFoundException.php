<?php

namespace App\Exceptions;

use Exception;

class ProductNotFoundException extends Exception
{
    public function __construct(string $code)
    {
        parent::__construct("Product not found: {$code}");
    }
}
