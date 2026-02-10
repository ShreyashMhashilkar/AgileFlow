from django.apps import AppConfig
import os


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"

    def ready(self):
        # keep signals
        import accounts.signals

        # auto create superuser (render free workaround)
        try:
            from django.contrib.auth.models import User

            username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
            password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
            email = os.environ.get("DJANGO_SUPERUSER_EMAIL")

            if username and password:
                if not User.objects.filter(username=username).exists():
                    User.objects.create_superuser(username, email, password)
                    print("✅ Superuser created")

        except Exception as e:
            print("⚠ Superuser skipped:", e)
