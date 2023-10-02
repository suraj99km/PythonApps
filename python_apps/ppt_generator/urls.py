from django.conf import settings
from django.conf.urls.static import static
from ppt_generator.views import config, pptgenerator
from django.urls import path, include

urlpatterns = [
    path("", config, name="ppt_config_generator" ),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
