from django.conf import settings
from django.conf.urls.static import static
from slotmachine.views import slotmachine, raffle_home
from django.urls import path, include

urlpatterns = [
    path("slotmachine", raffle_home, name="slotmachine" ),
    path("play", slotmachine, name="play"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)