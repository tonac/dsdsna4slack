from rest_framework import permissions
from archives.models import Archive, FileUpload


class IsArchiveOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return ((isinstance(obj, Archive) or isinstance(obj, FileUpload))
                and obj.user == request.user)
