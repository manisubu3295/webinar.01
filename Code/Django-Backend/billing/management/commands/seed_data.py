from django.core.management.base import BaseCommand

from billing.models import Customer, CustomerSpecialPrice, Product


class Command(BaseCommand):
    help = "Seed sample products and a sample customer with special pricing (idempotent)."

    def handle(self, *args, **options):
        products = [
            ("P001", "Basmati Rice 5kg", "450.00", "0.05"),
            ("P002", "Sunflower Oil 1L", "180.00", "0.18"),
            ("P003", "Toothpaste 100g", "55.00", "0.18"),
            ("P004", "Notebook 200pg", "40.00", "0.12"),
        ]
        for code, name, price, tax_rate in products:
            Product.objects.update_or_create(
                code=code, defaults={"name": name, "price": price, "tax_rate": tax_rate}
            )

        customer, _ = Customer.objects.update_or_create(
            id="C1001", defaults={"name": "Ramesh Kumar"}
        )
        CustomerSpecialPrice.objects.update_or_create(
            customer=customer, product=Product.objects.get(pk="P002"), defaults={"price": "165.00"}
        )

        self.stdout.write(self.style.SUCCESS(
            f"Seeded {len(products)} products and 1 customer (with special pricing on P002)."
        ))
