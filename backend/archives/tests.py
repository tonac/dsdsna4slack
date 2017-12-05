import zipfile
import json
import os

from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from rest_framework.authtoken.models import Token
from urllib.parse import urlparse
from django.conf import settings
from django.test.client import encode_multipart, RequestFactory
from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from .models import FileUpload, Archive


class FileUploadTests(APITestCase):

    def setUp(self):
        self.tearDown()
        self.user = User.objects.create_user('test', password='test',
                                     email='test@test.test')
        self.user.save()

    def tearDown(self):
        try:
            u = User.objects.get_by_natural_key('test')
            u.delete()

        except ObjectDoesNotExist:
            pass
        FileUpload.objects.all().delete()
        Archive.objects.all().delete()

    def _create_test_file_not_zip(self, name):
        f = open('\\Temp\\' + name, 'w')
        f.write('test file not zip\n')
        f.close()
        f = open('\\Temp\\' + name, 'rb')
        return {'datafile': f}

    def _create_test_file_empty_zip(self, name):
        f = zipfile.ZipFile('\\Temp\\' + name, 'w')
        f.close()
        f = open('\\Temp\\' + name, 'rb')
        return {'datafile': f}

    def _create_test_file_zip_users_and_channels(self, name):
        # writing into users.json file
        user1 = {'id': 'O3FCKBNMN', 'team_id': 'T7FCGNJ5N', 'name': 'test.user123'}
        user2 = {'id': 'U7FDLMP6U', 'team_id': 'T7FCGNJ5N', 'name': 'test.exporter'}
        users = [user1, user2]
        user_file = open('\\Temp\\users.json', 'w')
        user_file.write(json.dumps(users))
        user_file.close()
        # writing into channels.json file
        channel1 = {'id': 'C7GU87QEA', 'name': 'test_general'}
        channel_file = open('\\Temp\\channels.json', 'w')
        channel_file.write(json.dumps([channel1]))
        channel_file.close()
        # creating zip file
        f = zipfile.ZipFile('\\Temp\\' + name, 'w')
        f.write(user_file.name, arcname='users.json')
        f.write(channel_file.name, arcname='channels.json')
        f.close()
        f = open('\\Temp\\' + name, 'rb')
        return {'datafile': f}

    def test_upload_file(self):
        url = reverse('fileupload-list')

        # authentication
        token = Token.objects.get(user=self.user)
        client = APIClient()
        client.force_login(user=self.user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # assert authenticated user cannot upload non-zip file
        data1 = self._create_test_file_not_zip('test1')
        response = client.post(url, data1)
        self.assertContains(response, "Archive is not a zip file", status_code=400)
        data1.get('datafile').close()

        # assert authenticated user cannot upload zip file without users.json and channels.json files 
        data2 = self._create_test_file_empty_zip('test2.zip')
        response = client.post(url, data2)
        self.assertContains(response, "Archive must have users.json and channels.json files", status_code=400)
        data2.get('datafile').close()

        # assert authenticated user can upload valid zip file
        data3 = self._create_test_file_zip_users_and_channels('test3.zip')
        response = client.post(url, data3)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(urlparse(
            response.data['datafile']).path.startswith(settings.MEDIA_URL))

        # assert unauthenticated user can not upload file
        client.logout()
        response = client.post(url, data3)
        self.assertEqual(response.status_code, 401)
        data3.get('datafile').close()

        # assert unauthenticated user can not get files
        response = client.get(url)
        self.assertEqual(response.status_code, 401)
