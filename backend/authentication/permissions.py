from rest_framework import permissions


class CanAccessUsers(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.is_superuser
        elif request.method == 'POST':
            return True
        else:
            return False
