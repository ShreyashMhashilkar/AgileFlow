from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Sprint(models.Model):
    name = models.CharField(max_length=200)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="sprints"
    )


class Task(models.Model):
    STATUS = (
        ("todo", "Todo"),
        ("progress", "Progress"),
        ("done", "Done"),
    )

    title = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS, default="todo")
    sprint = models.ForeignKey(
        Sprint,
        on_delete=models.CASCADE,
        related_name="tasks"
    )
    points = models.IntegerField(default=0)
