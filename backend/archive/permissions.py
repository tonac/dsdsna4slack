from rest_framework import permissions

from archive.models import Archive


class IsArchiveOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (isinstance(obj, Archive)) and obj.user == request.user
