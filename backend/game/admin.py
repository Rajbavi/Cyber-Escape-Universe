from django.contrib import admin
from .models import UserProgress


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "mission",
        "completed",
        "score",
        "attempts",
        "completed_at",
    )

    list_filter = (
        "completed",
    )

    search_fields = (
        "user__username",
        "mission__title",
    )