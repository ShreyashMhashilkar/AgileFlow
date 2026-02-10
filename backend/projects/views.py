from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Project, Sprint, Task
from .serializers import ProjectSerializer, SprintSerializer, TaskSerializer


class ProjectView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SprintView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SprintSerializer

    def get_queryset(self):
        return Sprint.objects.filter(project__owner=self.request.user)


class TaskView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(sprint__project__owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save()
