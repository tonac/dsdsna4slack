from rest_framework.decorators import api_view
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from rest_framework import status, generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser


@api_view(['POST'])
def create_account(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            username=serialized.initial_data.get('username'),
            email=serialized.initial_data.get('email'),
            password=serialized.initial_data.get('password'),
            first_name=serialized.initial_data.get('firstName', ''),
            last_name=serialized.initial_data.get('lastName', '')
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
