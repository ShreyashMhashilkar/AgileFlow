from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE = (
        ("user","User"),
        ("admin","Admin"),
    )

    user=models.OneToOneField(User,on_delete=models.CASCADE)
    role=models.CharField(max_length=10,choices=ROLE,default="user")