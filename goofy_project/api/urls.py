from django.urls import path, include
from .views import register_login
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", register_login.Register.as_view()),
    path(
        "token/",
        register_login.CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("guest_user/", register_login.GuestView.as_view()),
]
