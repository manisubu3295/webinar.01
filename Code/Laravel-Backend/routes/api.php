<?php

use App\Http\Controllers\BillingController;
use Illuminate\Support\Facades\Route;

Route::get('/products/{code}', [BillingController::class, 'getProduct']);
Route::post('/invoices', [BillingController::class, 'createInvoice']);
Route::post('/invoices/{id}/cancel', [BillingController::class, 'cancelInvoice']);
Route::get('/invoices/{id}', [BillingController::class, 'getInvoice']);
Route::get('/invoices', [BillingController::class, 'listInvoices']);
