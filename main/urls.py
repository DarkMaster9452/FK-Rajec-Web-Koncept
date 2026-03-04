from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tim/', views.team, name='team'),
    path('tim/hrac/<int:pk>/', views.player_detail, name='player_detail'),
    path('zapasy/', views.matches, name='matches'),
    path('aktuality/', views.news_list, name='news_list'),
    path('aktuality/<slug:slug>/', views.news_detail, name='news_detail'),
    path('aktuality/nova/', views.news_create, name='news_create'),
    path('aktuality/<slug:slug>/upravit/', views.news_edit, name='news_edit'),
    # Auth
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('registracia/', views.register_view, name='register'),
    path('profil/', views.profile, name='profile'),
    # Trainings
    path('treningy/', views.training_list, name='training_list'),
    path('treningy/novy/', views.training_create, name='training_create'),
    path('treningy/<int:pk>/', views.training_detail, name='training_detail'),
    path('treningy/<int:pk>/upravit/', views.training_edit, name='training_edit'),
    path('treningy/<int:pk>/zmazat/', views.training_delete, name='training_delete'),
    path('treningy/<int:pk>/ucast/', views.training_mark_attendance, name='training_mark_attendance'),
    # Admin
    path('admin-panel/pouzivatelia/', views.user_management, name='user_management'),
    path('admin-panel/pouzivatelia/<int:pk>/rola/', views.user_role_change, name='user_role_change'),
]
