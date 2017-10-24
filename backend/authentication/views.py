from rest_framework.decorators import api_view
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from rest_framework import status, generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser


@api_view(['POST'])
def create_account(request):
    print('Check here', request.user, request.data)
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            username=serialized.initial_data['username'],
            email=serialized.initial_data['email'],
            password=serialized.initial_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
