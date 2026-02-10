from rest_framework import serializers
from .models import Project, Sprint, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        extra_kwargs = {
            "status": {"required": False},
            "points": {"required": False},
        }


class SprintSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Sprint
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Project
        fields = "__all__"
