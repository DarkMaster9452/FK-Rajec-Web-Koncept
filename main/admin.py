from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Player, Match, Training, TrainingAttendance, News


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('FK Rajec', {'fields': ('role', 'phone', 'bio', 'avatar')}),
    )
    list_display = ['username', 'get_full_name', 'email', 'role', 'is_active']
    list_filter = ['role', 'is_active', 'is_staff']


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['jersey_number', 'first_name', 'last_name', 'position', 'is_active']
    list_filter = ['position', 'is_active']
    search_fields = ['first_name', 'last_name']


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'match_type', 'season', 'is_home', 'score_display']
    list_filter = ['match_type', 'season', 'is_home']
    date_hierarchy = 'date'


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'coach', 'is_mandatory']
    list_filter = ['is_mandatory']
    date_hierarchy = 'date'


@admin.register(TrainingAttendance)
class TrainingAttendanceAdmin(admin.ModelAdmin):
    list_display = ['training', 'player', 'attended']
    list_filter = ['attended']


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'published_at', 'is_published']
    list_filter = ['is_published']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
