from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APITestCase

from .models import Archive


class ArchiveTests(APITestCase):

    def setUp(self):
        self.tearDown()
        self.user = User.objects.create_user('test', password='test',
                                             email='test@test.test')
        self.user.save()
        Archive.objects.create(name='test_archive1', user=self.user)
        Archive.objects.create(name='test_archive2', user=self.user)

    def tearDown(self):
        try:
            u = User.objects.get_by_natural_key('test')
            u.delete()

        except ObjectDoesNotExist:
            pass
        Archive.objects.all().delete()

    def test_archive(self):
        url = reverse('archive-list')

        # authentication
        token = Token.objects.get(user=self.user)
        client = APIClient()
        client.force_login(user=self.user)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        # assert authenticated user can get his archives
        response = client.get(url)
        self.assertEqual(len(response.data), 2)
        self.assertContains(response, "test_archive1")
        self.assertContains(response, "test_archive2")

        # assert authenticated user cannot post/put archives
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        response = client.put(url)
        self.assertEqual(response.status_code, 405)

        # assert authenticated user delete his archives
        archive = Archive.objects.get(name='test_archive1')
        url_archive = reverse('archive-detail', args=[archive.id])
        response = client.delete(url_archive)
        self.assertEqual(response.status_code, 204)

        # assert unauthenticated user can not get archives
        client.logout()
        response = client.get(url)
        self.assertEqual(response.status_code, 401)
