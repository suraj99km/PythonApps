from django.conf import settings
from django.conf.urls.static import static
from raffle.views import raffle
from django.urls import path, include

urlpatterns = [
    path("", raffle, name="raffle" ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)