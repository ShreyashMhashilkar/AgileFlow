from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True

        # only admin can create/update/delete
        return request.user.profile.role == "admin"
