from django.urls import path

from . import views

urlpatterns = [
    path("products/<str:code>", views.get_product),
    path("invoices/<str:invoice_id>/cancel", views.cancel_invoice),
    path("invoices/<str:invoice_id>", views.get_invoice),
    path("invoices", views.invoices_collection),
]
