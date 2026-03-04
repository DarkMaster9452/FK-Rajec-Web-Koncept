from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrátor'),
        ('coach', 'Tréner'),
        ('player', 'Hráč'),
        ('fan', 'Fanúšik'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='fan')
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def is_admin(self):
        return self.role == 'admin' or self.is_superuser

    def is_coach_or_above(self):
        return self.role in ('coach', 'admin') or self.is_superuser

    def is_player_or_above(self):
        return self.role in ('player', 'coach', 'admin') or self.is_superuser

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.get_role_display()})"


class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Brankár'),
        ('DEF', 'Obranca'),
        ('MID', 'Záložník'),
        ('FWD', 'Útočník'),
    ]
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    position = models.CharField(max_length=3, choices=POSITION_CHOICES)
    jersey_number = models.PositiveIntegerField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    nationality = models.CharField(max_length=100, default='Slovensko')
    photo = models.ImageField(upload_to='players/', blank=True, null=True)
    bio = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    goals = models.PositiveIntegerField(default=0)
    assists = models.PositiveIntegerField(default=0)
    appearances = models.PositiveIntegerField(default=0)
    joined_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['position', 'jersey_number']

    def __str__(self):
        return f"#{self.jersey_number} {self.first_name} {self.last_name} ({self.get_position_display()})"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"


class Match(models.Model):
    MATCH_TYPE_CHOICES = [
        ('league', 'Liga'),
        ('cup', 'Pohár'),
        ('friendly', 'Prípravný zápas'),
    ]
    home_team = models.CharField(max_length=200)
    away_team = models.CharField(max_length=200)
    date = models.DateTimeField()
    venue = models.CharField(max_length=200, default='Štadión FK Rajec')
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)
    match_type = models.CharField(max_length=20, choices=MATCH_TYPE_CHOICES, default='league')
    season = models.CharField(max_length=20, default='2024/2025')
    report = models.TextField(blank=True)
    is_home = models.BooleanField(default=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} ({self.date.strftime('%d.%m.%Y')})"

    def get_result(self):
        if self.home_score is None or self.away_score is None:
            return None
        if self.is_home:
            if self.home_score > self.away_score:
                return 'W'
            elif self.home_score < self.away_score:
                return 'L'
            return 'D'
        else:
            if self.away_score > self.home_score:
                return 'W'
            elif self.away_score < self.home_score:
                return 'L'
            return 'D'

    def score_display(self):
        if self.home_score is not None and self.away_score is not None:
            return f"{self.home_score}:{self.away_score}"
        return "vs"

    def is_upcoming(self):
        return self.date > timezone.now()


class Training(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=90)
    location = models.CharField(max_length=200, default='Štadión FK Rajec')
    description = models.TextField(blank=True)
    coach = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='coached_trainings'
    )
    attendees = models.ManyToManyField(User, blank=True, related_name='training_invites')
    is_mandatory = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} – {self.date.strftime('%d.%m.%Y %H:%M')}"


class TrainingAttendance(models.Model):
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='attendance_records')
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendance_records')
    attended = models.BooleanField(default=False)
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        unique_together = ('training', 'player')

    def __str__(self):
        return f"{self.player} - {self.training}"


class News(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True, max_length=500)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-published_at']
        verbose_name_plural = 'News'

    def __str__(self):
        return self.title
