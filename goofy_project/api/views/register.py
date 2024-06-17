from rest_framework.response import Response

# import viewclass restframework
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class Register(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, world!"})
