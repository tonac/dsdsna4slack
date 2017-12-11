from rest_framework import permissions

from analysis.models import OverallMetrics


class HasMetricsPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (isinstance(obj, OverallMetrics)) and obj.archive.user == request.user
