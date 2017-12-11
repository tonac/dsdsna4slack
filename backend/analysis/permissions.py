from rest_framework import permissions

from analysis.models import MetricsBaseClass


class HasMetricsPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (isinstance(obj, MetricsBaseClass)) and obj.archive.user == request.user
