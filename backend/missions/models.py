from django.db import models


class Mission(models.Model):
    DIFFICULTY_CHOICES = [
        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Hard", "Hard"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES
    )
    points = models.IntegerField(default=100)
    correct_answer = models.CharField(max_length=200)

    def __str__(self):
        return self.title
