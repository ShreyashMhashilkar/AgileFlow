import random
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Pipeline
from .serializers import PipelineSerializer

LOGS=[
 "Cloning repository...",
 "Installing dependencies...",
 "Running tests...",
 "Building image...",
 "Deploying to cloud..."
]

class PipelineView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PipelineSerializer

    def get_queryset(self):
        return Pipeline.objects.filter(owner=self.request.user)

    def create(self, request):
        p = Pipeline.objects.create(
            name=request.data["name"],
            owner=request.user,
            status="RUNNING"
        )

        p.logs = "\n".join(LOGS)
        p.status = random.choice(["SUCCESS", "FAILED"])
        p.save()

        return Response(PipelineSerializer(p).data)