from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path("api/missions/", include("missions.urls")),
    path("api/game/", include("game.urls")),
]

