from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone

from .models import Mission
from .serializers import MissionSerializer


class MissionListView(generics.ListAPIView):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer
    permission_classes = [AllowAny]


class MissionDetailView(generics.RetrieveAPIView):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer
    permission_classes = [AllowAny]


class MissionSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        from game.models import UserProgress

        try:
            mission = Mission.objects.get(pk=pk)
        except Mission.DoesNotExist:
            return Response(
                {"error": "Mission not found"},
                status=404
            )

        answer = request.data.get("answer", "").strip()

        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            mission=mission
        )

        progress.attempts += 1

        if answer.lower() == mission.correct_answer.lower():
            progress.completed = True
            progress.score = mission.points
            progress.completed_at = timezone.now()

            progress.save()

            return Response({
                "message": "Correct answer!",
                "correct": True,
                "score": progress.score,
                "attempts": progress.attempts
            })

        progress.save()

        return Response({
            "message": "Wrong answer!",
            "correct": False,
            "score": progress.score,
            "attempts": progress.attempts
        })