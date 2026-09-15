import uuid

from django.db import models


class Product(models.Model):
    """code is the natural key — staff look products up by memorized code."""

    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=4, default="0.18")

    def __str__(self):
        return f"{self.code} - {self.name}"


class Customer(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.id} - {self.name}"


class CustomerSpecialPrice(models.Model):
    """A negotiated unit price for one product, for one regular customer."""

    customer = models.ForeignKey(Customer, related_name="special_prices", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ("customer", "product")


class BillNumberSequence(models.Model):
    """
    A single-row counter table used with select_for_update() inside a
    transaction to hand out bill numbers one at a time — see
    services.next_bill_number() for why this is safe under concurrency.
    """

    last_value = models.PositiveIntegerField(default=1000)


class Invoice(models.Model):
    STATUS_CHOICES = [("OPEN", "OPEN"), ("CANCELLED", "CANCELLED")]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bill_number = models.CharField(max_length=20, unique=True)
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="OPEN")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.bill_number


class LineItem(models.Model):
    invoice = models.ForeignKey(Invoice, related_name="items", on_delete=models.CASCADE)
    product_code = models.CharField(max_length=20)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=4)
    line_subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    line_tax = models.DecimalField(max_digits=10, decimal_places=2)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)
