from django.db import models
from django.contrib.auth.models import User


class Pipeline(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="QUEUED")
    logs = models.TextField(blank=True)
