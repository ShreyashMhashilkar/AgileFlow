from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from projects.views import ProjectView, SprintView, TaskView
from pipelines.views import PipelineView
from accounts.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register("projects", ProjectView, basename="projects")
router.register("sprints", SprintView, basename="sprints")
router.register("tasks", TaskView, basename="tasks")
router.register("pipelines", PipelineView, basename="pipelines")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/register/", RegisterView.as_view()),
    path("api/login/", TokenObtainPairView.as_view()),
]
