from django.urls import path, include
from .views import register_login, home
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
    path("setup/", home.UserSetup.as_view()),
    path("make-transaction/", home.Transaction.as_view()),
    path("view-blockchain", home.ViewBlockchain.as_view()),
]
