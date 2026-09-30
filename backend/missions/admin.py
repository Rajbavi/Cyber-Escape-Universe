from django.contrib import admin
from .models import Mission


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "difficulty",
        "points",
    )

    list_filter = (
        "difficulty",
    )

    search_fields = (
        "title",
        "description",
    )
   