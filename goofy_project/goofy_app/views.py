from django.http import HttpResponse
from django.shortcuts import render

# import ensurce_csrf_cookie
from django.views import View
from django.views.decorators.csrf import ensure_csrf_cookie


# loading react build
@ensure_csrf_cookie
def home(request):
    return render(request, "index.html")
