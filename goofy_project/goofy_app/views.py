from django.http import HttpResponse
from django.shortcuts import render

# import ensurce_csrf_cookie
from django.views import View
from django.views.decorators.csrf import ensure_csrf_cookie


# loading react build
#username for /profile/str
@ensure_csrf_cookie
def home(request,username=None):
    response = render(request, 'index.html')
    response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response
