from rest_framework import serializers

from .models import UserProgress


class UserProgressSerializer(serializers.ModelSerializer):

    mission_title = serializers.CharField(
        source="mission.title",
        read_only=True
    )

    class Meta:
        model = UserProgress

        fields = [
            "id",
            "mission",
            "mission_title",
            "completed",
            "score",
            "attempts",
            "completed_at",
        ]