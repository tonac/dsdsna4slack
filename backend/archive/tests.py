import zipfile
import json
import os

from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APITestCase
from urllib.parse import urlparse

from .models import Archive 

TEMP_DIR = '/tmp'

class ArchiveTests(APITestCase):

    def setUp(self):
        self.tearDown()
        self.user = User.objects.create_user('test', password='test', email='test@test.test')
        self.user.save()
        self.authenticate()
        Archive.objects.create(name='test_archive1', user=self.user)
        Archive.objects.create(name='test_archive2', user=self.user)

    def tearDown(self):
        try:
            u = User.objects.get_by_natural_key('test')
            u.delete()
        except ObjectDoesNotExist:
            pass
        Archive.objects.all().delete()
    
    def authenticate(self):
        token = Token.objects.get(user=self.user)
        self.client = APIClient()
        self.client.force_login(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def _create_test_file_not_zip(self, name):
        f = open(TEMP_DIR + '/' + name, 'w') 
        f.write('test file not zip\n')
        f.close()
        f = open(TEMP_DIR + '/' + name, 'rb')
        return {'datafile': f}

    def _create_test_file_empty_zip(self, name):
        f = zipfile.ZipFile(TEMP_DIR + '/' + name, 'w')
        f.write('')
        f.close()
        f = open(TEMP_DIR + '/' + name, 'rb')
        return {'datafile': f}

    def _create_test_file_zip_users_and_channels(self, name):
        # writing into users.json file
        user1 = {'id': 'O3FCKBNMN', 'team_id': 'T7FCGNJ5N', 'name': 'test.user123', 'is_bot': False}
        user2 = {'id': 'U7FDLMP6U', 'team_id': 'T7FCGNJ5N', 'name': 'test.exporter', 'is_bot': False}
        channel1 = {'id': 'C7GU87QEA', 'name': 'test_general', 'members': ['O3FCKBNMN']}
        users = [user1, user2]
        f = zipfile.ZipFile(TEMP_DIR + '/' + name, 'w')
        user_file = open(TEMP_DIR + '/users.json', 'w')
        user_file.write(json.dumps(users))
        # writing into channels.json file
        channel_file = open(TEMP_DIR + '/channels.json', 'w')
        channel_file.write(json.dumps([channel1]))
        # creating zip file
        f.write(user_file.name, arcname='users.json')
        f.write(channel_file.name, arcname='channels.json')
        f.close()
        f = open(TEMP_DIR + '/' + name, 'rb')
        return {'datafile': f}

    def test_authenticated_user_get_archives(self):
        # assert authenticated user can get archives
        url = reverse('archive-list')
        response = self.client.get(url)
        self.assertEqual(len(response.data), 2)
        self.assertContains(response, "test_archive1")
        self.assertContains(response, "test_archive2")

    def test_authenticated_user_put_archives(self):
        # assert authenticated user cannot put archives
        url = reverse('archive-list')
        response = self.client.put(url)
        self.assertEqual(response.status_code, 405)

    def test_authenticated_user_delete_archives(self):
        # assert authenticated user can delete archives
        archive = Archive.objects.get(name='test_archive1')
        url = reverse('archive-detail', args=[archive.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

    def test_upload_non_zip_file(self):
        # assert authenticated user cannot upload non-zip file
        url = reverse('archive-list')
        data1 = self._create_test_file_not_zip('test1')
        response = self.client.post(url, data1)
        self.assertContains(response, "Archive is not a zip file", status_code=400)
        data1.get('datafile').close()

    def test_upload_non_valid_zip_file(self):
        # assert authenticated user cannot upload zip file without users.json and channels.json files 
        url = reverse('archive-list')
        data2 = self._create_test_file_empty_zip('test2.zip')
        response = self.client.post(url, data2)
        self.assertContains(response, "Archive must have users.json and channels.json files", status_code=400)
        data2.get('datafile').close()

    def test_upload_zip_file(self):
        # assert authenticated user can upload valid zip file
        url = reverse('archive-list')
        data3 = self._create_test_file_zip_users_and_channels('test3.zip')
        response = self.client.post(url, data3)
        self.assertEqual(response.status_code, 201)
        self.assertContains(response, "uploaded", status_code=201)
        self.assertContains(response, "channels", status_code=201)
        self.assertContains(response, "id", status_code=201)
        data3.get('datafile').close()

    def test_unauthenticated_user_upload(self):
        # assert unauthenticated user can not upload file
        url = reverse('archive-list')
        self.client.logout()
        data4 = self._create_test_file_empty_zip('test4.zip')
        response = self.client.post(url, data4)
        self.assertEqual(response.status_code, 401)
        data4.get('datafile').close()

    def test_unauthenticated_user_get(self):
        # assert unauthenticated user can not get archives
        url = reverse('archive-list')
        self.client.logout()
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
