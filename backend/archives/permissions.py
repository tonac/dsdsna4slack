from rest_framework import permissions
from archives.models import Archive, SlackUser, Channel, Message

class IsArchiveOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (isinstance(obj, Archive) and obj.user == request.user) or \
                ((isinstance(obj, SlackUser) or isinstance(obj, Channel)) and obj.archive.user == request.user) or \
                (isinstance(obj, Message) and obj.channel.archive.user == request.user)