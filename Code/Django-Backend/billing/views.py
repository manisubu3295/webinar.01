from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import services
from .models import Invoice
from .serializers import InvoiceSerializer, ProductSerializer


@api_view(["GET"])
def get_product(request, code):
    try:
        product = services.get_product_or_404(code)
    except Http404:
        return Response({"error": f"Product not found: {code}"}, status=404)
    return Response(ProductSerializer(product).data)


@api_view(["GET", "POST"])
def invoices_collection(request):
    """GET /api/invoices?date= and POST /api/invoices share one path."""
    if request.method == "POST":
        try:
            invoice = services.create_invoice(
                customer_id=request.data.get("customerId"),
                items=request.data.get("items", []),
            )
        except services.ValidationError as exc:
            return Response({"error": str(exc)}, status=400)
        except Http404:
            return Response({"error": "One of the products in the cart was not found"}, status=404)
        return Response(InvoiceSerializer(invoice).data, status=201)

    date = request.query_params.get("date")
    qs = Invoice.objects.all().order_by("-created_at")
    if date:
        qs = qs.filter(created_at__date=date)
    return Response(InvoiceSerializer(qs, many=True).data)


@api_view(["GET"])
def get_invoice(request, invoice_id):
    try:
        invoice = Invoice.objects.get(pk=invoice_id)
    except (Invoice.DoesNotExist, ValueError, DjangoValidationError):
        return Response({"error": f"Invoice not found: {invoice_id}"}, status=404)
    return Response(InvoiceSerializer(invoice).data)


@api_view(["POST"])
def cancel_invoice(request, invoice_id):
    try:
        invoice = services.cancel_invoice(invoice_id)
    except (Http404, ValueError, DjangoValidationError):
        return Response({"error": f"Invoice not found: {invoice_id}"}, status=404)
    return Response(InvoiceSerializer(invoice).data)


