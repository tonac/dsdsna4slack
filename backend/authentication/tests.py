import json
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .serializers import UserSerializer


class GetAllAccountsTest(APITestCase):
    """ Test module for GET all users API """

    def setUp(self):
        User.objects.create(first_name='Casper', username='casper', email='bull.dog@gmail.com')
        User.objects.create(first_name='Muffin', username='muffin', email='gradane@gmail.com')
        normal_user = User.objects.create(first_name='Rambo', username='rambo', email='labrador@gmail.com')
        admin_user = User.objects.create_superuser(first_name='Ricky', username='ricky', password='secret', email=None)
        self.admin_client = APIClient()
        self.admin_client.force_authenticate(user=admin_user)
        self.normal_client = APIClient()
        self.normal_client.force_authenticate(user=normal_user)
        self.anonymus_client = APIClient()

    def test_get_all_accounts_not_authenticated(self):
        response = self.anonymus_client.get(reverse('accounts'))
        self.assertEqual(response.data['detail'], 'Authentication credentials were not provided.')
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED), 'Should be 401, you need to log in as admin to get data.'

    def test_get_all_accounts_not_enough_permission(self):
        response = self.normal_client.get(reverse('accounts'))
        self.assertEqual(response.data['detail'], 'You do not have permission to perform this action.')
        self.assertEqual(response.status_code,
                         status.HTTP_403_FORBIDDEN), 'Should be 403, just admin user can get data.'

    def test_get_all_accounts(self):
        response = self.admin_client.get(reverse('accounts'))
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data), 'User got from API are not the same as created'
        self.assertEqual(response.status_code, status.HTTP_200_OK), 'Should be 200, it is legit request'


class RegisterNewUser(APITestCase):
    """ Test module for registering new user. """

    anonymus_client = APIClient()

    def test_create_new_user_success(self):
        response = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'LetsGoo!'}),
            content_type='application/json'
        )
        self.assertEqual(response.data, {'username': 'casper', 'password': None})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED), 'Should be 201 succefull new user'

    def test_create_new_user_duplicate(self):
        response = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'LetsGoo!'}),
            content_type='application/json'
        )
        self.assertEqual(response.data, {'username': 'casper', 'password': None})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED), 'Should be 201 succefull new user'

        response2 = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'LetsGooWithNewPass!'}),
            content_type='application/json'
        )
        self.assertEqual(response2.data['username'], ['A user with that username already exists.'])
        self.assertEqual(response2.status_code,
                         status.HTTP_400_BAD_REQUEST), 'Should be 400 because user with the same username already exists.'

    def test_create_new_user_bad_password(self):
        response = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'casp'}),
            content_type='application/json'
        )
        self.assertEqual(
            response.data['password'],
            ['This password is too short. It must contain at least 8 characters.']
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST), 'Should be 400 bad password'

        response = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'asdfasdf'}),
            content_type='application/json'
        )
        self.assertEqual(response.data['password'], ['This password is too common.'])
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST), 'Should be 400 bad password'

    def test_create_new_user_bad_email(self):
        response = self.anonymus_client.post(
            reverse('accounts'),
            data=json.dumps({'username': 'casper', 'password': 'LetsGoo!', 'email': 'email@email.a'}),
            content_type='application/json'
        )
        self.assertEqual(response.data['email'], ['Enter a valid email address.'])
        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST), 'Should be 400, bad email. Top level domain do not exist.'


class GetToken(APITestCase):
    """ Test module for getting token. """

    anonymus_client = APIClient()

    def setUp(self):
        User.objects.create_user(first_name='Casper', username='casper', password='casper_pass')

    def test_get_token_succesfull(self):
        response = self.anonymus_client.post(
            reverse('get_token'),
            data=json.dumps({'username': 'casper', 'password': 'casper_pass'}),
            content_type='application/json'
        )
        self.assertIsNotNone(response.data.get('token')), 'User exist and API returns token'
        self.assertEqual(response.status_code, status.HTTP_200_OK), 'Should be 200 API call with good credentials'
