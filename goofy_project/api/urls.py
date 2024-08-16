from django.urls import path, include
from .views import register_login, home
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # login views
    path("register/", register_login.Register.as_view()),
    path(
        "token/",
        register_login.CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("guest_user/", register_login.GuestView.as_view()),
    path("google_login/", register_login.GoogleUser.as_view()),
    path("convert_guest/", register_login.ConvertGuest.as_view()),
    # other views
    path("setup/", home.UserSetup.as_view()),
    path("make-transaction/", home.Transaction.as_view()),
    path("view-blockchain/", home.ViewBlockchain.as_view()),
    path("verify-token/", home.VerifyToken.as_view()),
    path("upload_pfp/", home.Pfp.as_view()),
]
