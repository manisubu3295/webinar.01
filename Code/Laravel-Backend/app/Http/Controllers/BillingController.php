<?php

namespace App\Http\Controllers;

use App\Exceptions\BillingValidationException;
use App\Exceptions\InvoiceNotFoundException;
use App\Exceptions\ProductNotFoundException;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProductResource;
use App\Services\BillingService;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function __construct(private BillingService $billingService)
    {
    }

    public function getProduct(string $code)
    {
        try {
            return new ProductResource($this->billingService->getProduct($code));
        } catch (ProductNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function createInvoice(Request $request)
    {
        try {
            $invoice = $this->billingService->createInvoice(
                $request->input('customerId'),
                $request->input('items', [])
            );
            return (new InvoiceResource($invoice))->response()->setStatusCode(201);
        } catch (ProductNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (BillingValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getInvoice(string $id)
    {
        try {
            return new InvoiceResource($this->billingService->getInvoice($id));
        } catch (InvoiceNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function cancelInvoice(string $id)
    {
        try {
            return new InvoiceResource($this->billingService->cancelInvoice($id));
        } catch (InvoiceNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function listInvoices(Request $request)
    {
        return InvoiceResource::collection(
            $this->billingService->listInvoices($request->query('date'))
        );
    }
}
