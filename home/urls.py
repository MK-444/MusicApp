
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('overlay_music', views.overlay_music, name="overlay"),
    # path('', views.user_music, name="user_music")
]
