from django.db import models
from django.contrib.auth.models import User

from missions.models import Mission


class UserProgress(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    mission = models.ForeignKey(
        Mission,
        on_delete=models.CASCADE
    )

    completed = models.BooleanField(
        default=False
    )

    score = models.IntegerField(
        default=0
    )

    attempts = models.IntegerField(
        default=0
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.mission.title}"
        )