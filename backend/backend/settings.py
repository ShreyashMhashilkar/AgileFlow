from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "dev"
DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
 "django.contrib.admin",
 "django.contrib.auth",
 "django.contrib.contenttypes",
 "django.contrib.sessions",
 "django.contrib.messages",
 "django.contrib.staticfiles",

 "corsheaders",
 "rest_framework",

 "accounts",
 "projects",
 "pipelines",
]

MIDDLEWARE = [
 "corsheaders.middleware.CorsMiddleware",
 "django.middleware.security.SecurityMiddleware",
 "django.contrib.sessions.middleware.SessionMiddleware",
 "django.middleware.common.CommonMiddleware",
 "django.middleware.csrf.CsrfViewMiddleware",
 "django.contrib.auth.middleware.AuthenticationMiddleware",
 "django.contrib.messages.middleware.MessageMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True

REST_FRAMEWORK = {
 "DEFAULT_AUTHENTICATION_CLASSES": (
  "rest_framework_simplejwt.authentication.JWTAuthentication",
 )
}

DATABASES = {
 "default": {
  "ENGINE": "django.db.backends.sqlite3",
  "NAME": BASE_DIR / "db.sqlite3",
 }
}

ROOT_URLCONF = "backend.urls"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
WSGI_APPLICATION = "backend.wsgi.application"
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STATIC_ROOT = BASE_DIR / "staticfiles"
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


if os.environ.get("DJANGO_SUPERUSER_USERNAME"):
    try:
        from django.contrib.auth.models import User
        if not User.objects.filter(username=os.environ["DJANGO_SUPERUSER_USERNAME"]).exists():
            User.objects.create_superuser(
                username=os.environ["DJANGO_SUPERUSER_USERNAME"],
                email=os.environ["DJANGO_SUPERUSER_EMAIL"],
                password=os.environ["DJANGO_SUPERUSER_PASSWORD"],
            )
    except Exception as e:
        print("Superuser creation skipped:", e)