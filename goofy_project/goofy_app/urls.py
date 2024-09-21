from django.urls import path, include

from . import views

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

redirect_urls = ["dashboard","blockchain","transactions","settings","profile/<str:username>"]

#home is the reactapp itself
urlpatterns = [
    *[path(url, views.home) for url in redirect_urls],
    path("", views.home),

    path("api/", include("api.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
