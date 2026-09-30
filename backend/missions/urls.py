from django.urls import path

from .views import (
    MissionListView,
    MissionDetailView,
    MissionSubmitView,
)


urlpatterns = [
    path(
        "",
        MissionListView.as_view(),
        name="mission-list",
    ),

    path(
        "<int:pk>/",
        MissionDetailView.as_view(),
        name="mission-detail",
    ),

    path(
        "<int:pk>/submit/",
        MissionSubmitView.as_view(),
        name="mission-submit",
    ),
]