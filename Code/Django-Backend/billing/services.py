from decimal import Decimal, ROUND_HALF_UP

from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import BillNumberSequence, Customer, CustomerSpecialPrice, Invoice, LineItem, Product

DEFAULT_TAX_RATE = Decimal("0.18")  # 18% GST unless a product overrides it


class ValidationError(Exception):
    pass


def round2(value) -> Decimal:
    return Decimal(value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def next_bill_number() -> str:
    """
    Bill numbers must never collide, even under concurrent requests. We keep a
    single-row counter table and, inside a transaction, SELECT ... FOR UPDATE
    that row before incrementing it. Postgres/MySQL/SQLite (via Django's ORM)
    all block a second concurrent request on that row until the first
    transaction commits, so two requests can never read-then-write the same
    counter value — the classic race a plain "SELECT max + 1" has. SQLite
    (the demo's default) serializes writers anyway, but the same code works
    unchanged if this is pointed at Postgres/MySQL in production.
    """
    with transaction.atomic():
        row, _ = BillNumberSequence.objects.select_for_update().get_or_create(pk=1)
        row.last_value += 1
        row.save()
        return f"INV-{row.last_value:06d}"


def get_product_or_404(code: str) -> Product:
    return get_object_or_404(Product, pk=code.upper())


def create_invoice(customer_id: str | None, items: list[dict]) -> Invoice:
    if not items:
        raise ValidationError("At least one line item is required")
    for item in items:
        if not item.get("productCode") or item.get("quantity", 0) <= 0:
            raise ValidationError("Each item needs a productCode and a positive quantity")

    customer = None
    special_prices: dict[str, Decimal] = {}
    if customer_id:
        try:
            customer = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            raise ValidationError(f"Unknown customerId: {customer_id}")
        special_prices = {
            sp.product_id: sp.price for sp in CustomerSpecialPrice.objects.filter(customer=customer)
        }

    # Resolve pricing before touching the shared bill-number counter, so a bad
    # product code fails fast without burning a bill number.
    resolved = []
    for item in items:
        product = get_product_or_404(item["productCode"])
        unit_price = special_prices.get(product.code, product.price)
        tax_rate = product.tax_rate or DEFAULT_TAX_RATE
        quantity = item["quantity"]
        line_subtotal = round2(unit_price * quantity)
        line_tax = round2(line_subtotal * tax_rate)
        resolved.append(
            {
                "product_code": product.code,
                "quantity": quantity,
                "unit_price": unit_price,
                "tax_rate": tax_rate,
                "line_subtotal": line_subtotal,
                "line_tax": line_tax,
                "line_total": round2(line_subtotal + line_tax),
            }
        )

    subtotal = round2(sum(i["line_subtotal"] for i in resolved))
    tax = round2(sum(i["line_tax"] for i in resolved))
    total = round2(subtotal + tax)

    with transaction.atomic():
        bill_number = next_bill_number()
        invoice = Invoice.objects.create(
            bill_number=bill_number,
            customer=customer,
            subtotal=subtotal,
            tax=tax,
            total=total,
            status="OPEN",
        )
        LineItem.objects.bulk_create([LineItem(invoice=invoice, **fields) for fields in resolved])

    return invoice


def cancel_invoice(invoice_id) -> Invoice:
    invoice = get_object_or_404(Invoice, pk=invoice_id)
    # Idempotent: cancelling an already-cancelled bill just returns it. The
    # bill number is never reassigned or reused (GST compliance).
    if invoice.status != "CANCELLED":
        invoice.status = "CANCELLED"
        invoice.save()
    return invoice
