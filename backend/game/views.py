from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import UserProgress
from .serializers import UserProgressSerializer


class UserProgressView(generics.ListCreateAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            completed_at=timezone.now(),
            attempts=1
        )
