from rest_framework import serializers

from .models import Invoice, LineItem, Product


class ProductSerializer(serializers.ModelSerializer):
    taxRate = serializers.DecimalField(source="tax_rate", max_digits=5, decimal_places=4)

    class Meta:
        model = Product
        fields = ["code", "name", "price", "taxRate"]


class LineItemSerializer(serializers.ModelSerializer):
    productCode = serializers.CharField(source="product_code")
    unitPrice = serializers.DecimalField(source="unit_price", max_digits=10, decimal_places=2)
    taxRate = serializers.DecimalField(source="tax_rate", max_digits=5, decimal_places=4)
    lineSubtotal = serializers.DecimalField(source="line_subtotal", max_digits=10, decimal_places=2)
    lineTax = serializers.DecimalField(source="line_tax", max_digits=10, decimal_places=2)
    lineTotal = serializers.DecimalField(source="line_total", max_digits=10, decimal_places=2)

    class Meta:
        model = LineItem
        fields = ["productCode", "quantity", "unitPrice", "taxRate", "lineSubtotal", "lineTax", "lineTotal"]


class InvoiceSerializer(serializers.ModelSerializer):
    billNumber = serializers.CharField(source="bill_number")
    customerId = serializers.SerializerMethodField()
    items = LineItemSerializer(many=True, read_only=True)
    createdAt = serializers.DateTimeField(source="created_at")

    class Meta:
        model = Invoice
        fields = ["id", "billNumber", "customerId", "items", "subtotal", "tax", "total", "status", "createdAt"]

    def get_customerId(self, obj):
        return obj.customer_id
