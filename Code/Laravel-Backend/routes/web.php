<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'service' => 'aamec-billing-laravel-backend',
        'status' => 'ok',
        'endpoints' => [
            'GET  /api/products/{code}',
            'POST /api/invoices',
            'GET  /api/invoices/{id}',
            'POST /api/invoices/{id}/cancel',
            'GET  /api/invoices?date=YYYY-MM-DD',
        ],
    ]);
});
