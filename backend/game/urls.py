from django.urls import path
from .views import UserProgressView

urlpatterns = [
    path(
        "progress/",
        UserProgressView.as_view(),
        name="user-progress",
    ),
]
