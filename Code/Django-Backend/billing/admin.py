from django.contrib import admin

from .models import BillNumberSequence, Customer, CustomerSpecialPrice, Invoice, LineItem, Product

admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(CustomerSpecialPrice)
admin.site.register(Invoice)
admin.site.register(LineItem)
admin.site.register(BillNumberSequence)
