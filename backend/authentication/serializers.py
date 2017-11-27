from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password as django_validate


class UserSerializer(serializers.ModelSerializer):

    def validate_password(self, password):
        # Extra validation for password (check settings to see validators)
        django_validate(password)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name',
                  'last_login', 'last_name', 'is_active', 'is_staff', 'is_superuser')
