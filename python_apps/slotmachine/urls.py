from django.conf import settings
from django.conf.urls.static import static
from slotmachine.views import slotmachine
from django.urls import path, include

urlpatterns = [
    path("", slotmachine, name="slotmachine" ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)