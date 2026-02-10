from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.serializers import ModelSerializer

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=("username","password")
        extra_kwargs={"password":{"write_only":True}}

    def create(self,data):
        return User.objects.create_user(**data)

class RegisterView(CreateAPIView):
    serializer_class=UserSerializer
