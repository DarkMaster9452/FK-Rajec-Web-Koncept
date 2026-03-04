from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.db.models import Q
from .models import User, Player, Match, Training, TrainingAttendance, News
from .forms import LoginForm, RegisterForm, ProfileForm, TrainingForm, NewsForm, UserRoleForm


def index(request):
    upcoming_matches = Match.objects.filter(date__gte=timezone.now()).order_by('date')[:3]
    recent_matches = Match.objects.filter(
        date__lt=timezone.now(),
        home_score__isnull=False
    ).order_by('-date')[:5]
    latest_news = News.objects.filter(is_published=True).order_by('-published_at')[:3]
    players_count = Player.objects.filter(is_active=True).count()
    next_training = Training.objects.filter(date__gte=timezone.now()).order_by('date').first()
    return render(request, 'index.html', {
        'upcoming_matches': upcoming_matches,
        'recent_matches': recent_matches,
        'latest_news': latest_news,
        'players_count': players_count,
        'next_training': next_training,
    })


def team(request):
    goalkeepers = Player.objects.filter(position='GK', is_active=True)
    defenders = Player.objects.filter(position='DEF', is_active=True)
    midfielders = Player.objects.filter(position='MID', is_active=True)
    forwards = Player.objects.filter(position='FWD', is_active=True)
    return render(request, 'team.html', {
        'goalkeepers': goalkeepers,
        'defenders': defenders,
        'midfielders': midfielders,
        'forwards': forwards,
    })


def player_detail(request, pk):
    player = get_object_or_404(Player, pk=pk)
    return render(request, 'player_detail.html', {'player': player})


def matches(request):
    season = request.GET.get('season', '2024/2025')
    all_seasons = Match.objects.values_list('season', flat=True).distinct().order_by('-season')
    upcoming = Match.objects.filter(date__gte=timezone.now(), season=season).order_by('date')
    results = Match.objects.filter(
        date__lt=timezone.now(), season=season, home_score__isnull=False
    ).order_by('-date')
    return render(request, 'matches.html', {
        'upcoming': upcoming,
        'results': results,
        'season': season,
        'all_seasons': all_seasons,
    })


def news_list(request):
    news_items = News.objects.filter(is_published=True)
    return render(request, 'news_list.html', {'news_items': news_items})


def news_detail(request, slug):
    article = get_object_or_404(News, slug=slug, is_published=True)
    related = News.objects.filter(is_published=True).exclude(pk=article.pk)[:3]
    return render(request, 'news_detail.html', {'article': article, 'related': related})


# --- Auth views ---

def login_view(request):
    if request.user.is_authenticated:
        return redirect('index')
    form = LoginForm(request, data=request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.get_user()
        login(request, user)
        messages.success(request, f'Vitajte, {user.get_full_name() or user.username}!')
        return redirect(request.GET.get('next', 'index'))
    return render(request, 'login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'Boli ste odhlásení.')
    return redirect('index')


def register_view(request):
    if request.user.is_authenticated:
        return redirect('index')
    form = RegisterForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.save()
        login(request, user)
        messages.success(request, 'Účet bol úspešne vytvorený!')
        return redirect('index')
    return render(request, 'register.html', {'form': form})


@login_required
def profile(request):
    form = ProfileForm(request.POST or None, request.FILES or None, instance=request.user)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Profil bol aktualizovaný.')
        return redirect('profile')
    return render(request, 'profile.html', {'form': form})


# --- Training views ---

@login_required
def training_list(request):
    if not request.user.is_player_or_above():
        messages.error(request, 'Nemáte prístup k tréningom.')
        return redirect('index')
    upcoming = Training.objects.filter(date__gte=timezone.now()).order_by('date')
    past = Training.objects.filter(date__lt=timezone.now()).order_by('-date')[:10]
    return render(request, 'training_list.html', {'upcoming': upcoming, 'past': past})


@login_required
def training_detail(request, pk):
    if not request.user.is_player_or_above():
        messages.error(request, 'Nemáte prístup k tréningom.')
        return redirect('index')
    training = get_object_or_404(Training, pk=pk)
    attendance = TrainingAttendance.objects.filter(training=training)
    my_attendance = attendance.filter(player=request.user).first()
    return render(request, 'training_detail.html', {
        'training': training,
        'attendance': attendance,
        'my_attendance': my_attendance,
    })


@login_required
def training_create(request):
    if not request.user.is_coach_or_above():
        messages.error(request, 'Nemáte oprávnenie vytvárať tréningy.')
        return redirect('training_list')
    form = TrainingForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        training = form.save(commit=False)
        training.coach = request.user
        training.save()
        messages.success(request, 'Tréning bol vytvorený.')
        return redirect('training_list')
    return render(request, 'training_form.html', {'form': form, 'action': 'Vytvoriť'})


@login_required
def training_edit(request, pk):
    training = get_object_or_404(Training, pk=pk)
    if not request.user.is_coach_or_above():
        messages.error(request, 'Nemáte oprávnenie upravovať tréningy.')
        return redirect('training_list')
    form = TrainingForm(request.POST or None, instance=training)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Tréning bol aktualizovaný.')
        return redirect('training_detail', pk=pk)
    return render(request, 'training_form.html', {'form': form, 'training': training, 'action': 'Upraviť'})


@login_required
def training_delete(request, pk):
    training = get_object_or_404(Training, pk=pk)
    if not request.user.is_coach_or_above():
        messages.error(request, 'Nemáte oprávnenie mazať tréningy.')
        return redirect('training_list')
    if request.method == 'POST':
        training.delete()
        messages.success(request, 'Tréning bol zmazaný.')
        return redirect('training_list')
    return render(request, 'training_confirm_delete.html', {'training': training})


@login_required
def training_mark_attendance(request, pk):
    training = get_object_or_404(Training, pk=pk)
    if not request.user.is_player_or_above():
        messages.error(request, 'Nemáte prístup.')
        return redirect('index')
    attended = request.POST.get('attended') == 'yes'
    note = request.POST.get('note', '')
    TrainingAttendance.objects.update_or_create(
        training=training,
        player=request.user,
        defaults={'attended': attended, 'note': note}
    )
    messages.success(request, 'Účasť bola zaznamenaná.')
    return redirect('training_detail', pk=pk)


# --- Admin/Coach views ---

@login_required
def user_management(request):
    if not request.user.is_admin():
        messages.error(request, 'Nemáte prístup k správe používateľov.')
        return redirect('index')
    users = User.objects.all().order_by('role', 'username')
    return render(request, 'user_management.html', {'users': users})


@login_required
def user_role_change(request, pk):
    if not request.user.is_admin():
        messages.error(request, 'Nemáte prístup.')
        return redirect('index')
    target = get_object_or_404(User, pk=pk)
    form = UserRoleForm(request.POST or None, instance=target)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, f'Rola používateľa {target.username} bola zmenená.')
        return redirect('user_management')
    return render(request, 'user_role_form.html', {'form': form, 'target': target})


@login_required
def news_create(request):
    if not request.user.is_coach_or_above():
        messages.error(request, 'Nemáte oprávnenie pridávať správy.')
        return redirect('news_list')
    form = NewsForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        article = form.save(commit=False)
        article.author = request.user
        article.save()
        messages.success(request, 'Správa bola publikovaná.')
        return redirect('news_detail', slug=article.slug)
    return render(request, 'news_form.html', {'form': form, 'action': 'Vytvoriť'})


@login_required
def news_edit(request, slug):
    article = get_object_or_404(News, slug=slug)
    if not request.user.is_coach_or_above():
        messages.error(request, 'Nemáte oprávnenie upravovať správy.')
        return redirect('news_list')
    form = NewsForm(request.POST or None, request.FILES or None, instance=article)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Správa bola aktualizovaná.')
        return redirect('news_detail', slug=slug)
    return render(request, 'news_form.html', {'form': form, 'article': article, 'action': 'Upraviť'})
