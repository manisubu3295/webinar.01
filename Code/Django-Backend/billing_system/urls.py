from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def index(_request):
    return JsonResponse(
        {
            "service": "aamec-billing-django-backend",
            "status": "ok",
            "endpoints": [
                "GET  /api/products/<code>",
                "POST /api/invoices",
                "GET  /api/invoices/<id>",
                "POST /api/invoices/<id>/cancel",
                "GET  /api/invoices?date=YYYY-MM-DD",
            ],
        }
    )


urlpatterns = [
    path("", index),
    path("admin/", admin.site.urls),
    path("api/", include("billing.urls")),
]
