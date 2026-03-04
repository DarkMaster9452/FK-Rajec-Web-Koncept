from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
import random


class Command(BaseCommand):
    help = 'Seed the database with FK Rajec sample data'

    def handle(self, *args, **kwargs):
        from main.models import User, Player, Match, Training, News

        self.stdout.write('Creating users...')
        # Admin
        admin, _ = User.objects.get_or_create(username='admin', defaults={
            'email': 'admin@fkrajec.sk',
            'role': 'admin',
            'first_name': 'Admin',
            'last_name': 'FK Rajec',
            'is_staff': True,
            'is_superuser': True,
        })
        admin.set_password('admin123')
        admin.save()

        # Coach
        coach, _ = User.objects.get_or_create(username='trener', defaults={
            'email': 'trener@fkrajec.sk',
            'role': 'coach',
            'first_name': 'Ján',
            'last_name': 'Novák',
        })
        coach.set_password('trener123')
        coach.save()

        # Player user
        player_user, _ = User.objects.get_or_create(username='hrac1', defaults={
            'email': 'hrac1@fkrajec.sk',
            'role': 'player',
            'first_name': 'Peter',
            'last_name': 'Kováč',
        })
        player_user.set_password('hrac123')
        player_user.save()

        # Fan user
        fan, _ = User.objects.get_or_create(username='fanusik', defaults={
            'email': 'fan@fkrajec.sk',
            'role': 'fan',
            'first_name': 'Miro',
            'last_name': 'Fanúšik',
        })
        fan.set_password('fan123')
        fan.save()

        self.stdout.write('Creating players...')
        players_data = [
            ('GK', 1, 'Tomáš', 'Brankár', 12, 0, 0),
            ('DEF', 4, 'Michal', 'Obranec', 45, 0, 2),
            ('DEF', 5, 'Lukáš', 'Bek', 38, 1, 3),
            ('DEF', 3, 'Rastislav', 'Stopér', 52, 2, 1),
            ('DEF', 2, 'Martin', 'Pravý bek', 40, 0, 4),
            ('MID', 6, 'Jozef', 'Stred', 60, 5, 8),
            ('MID', 8, 'Radoslav', 'Záložník', 55, 7, 10),
            ('MID', 10, 'Filip', 'Tvorivý', 48, 9, 15),
            ('MID', 7, 'Ondrej', 'Krajný', 42, 4, 6),
            ('FWD', 9, 'Pavel', 'Útočník', 50, 18, 5),
            ('FWD', 11, 'Jakub', 'Krídlo', 44, 12, 9),
        ]
        for pos, num, first, last, apps, goals, assists in players_data:
            Player.objects.get_or_create(
                jersey_number=num,
                defaults={
                    'first_name': first,
                    'last_name': last,
                    'position': pos,
                    'nationality': 'Slovensko',
                    'appearances': apps,
                    'goals': goals,
                    'assists': assists,
                    'is_active': True,
                }
            )

        self.stdout.write('Creating matches...')
        now = timezone.now()
        past_matches = [
            ('FK Rajec', 'FC Bytča', now - timedelta(days=7), True, 2, 1, 'league'),
            ('TJ Kotešová', 'FK Rajec', now - timedelta(days=14), False, 0, 3, 'league'),
            ('FK Rajec', 'TJ Turzovka', now - timedelta(days=21), True, 1, 1, 'league'),
            ('FK Rajec', 'OFK Oravská Jasenica', now - timedelta(days=28), True, 3, 0, 'league'),
            ('FK Slovan Rajecká Lesná', 'FK Rajec', now - timedelta(days=35), False, 1, 2, 'league'),
        ]
        for home, away, date, is_home, hs, aws, mtype in past_matches:
            Match.objects.get_or_create(
                home_team=home, away_team=away, date=date,
                defaults={
                    'is_home': is_home,
                    'home_score': hs,
                    'away_score': aws,
                    'match_type': mtype,
                    'season': '2024/2025',
                    'venue': 'Štadión FK Rajec' if is_home else 'ihrisko súpera',
                }
            )

        upcoming_matches = [
            ('FK Rajec', 'TJ Gbeľany', now + timedelta(days=7), True, 'league'),
            ('MFK Dubnica', 'FK Rajec', now + timedelta(days=14), False, 'league'),
            ('FK Rajec', 'OFK Raková', now + timedelta(days=21), True, 'cup'),
        ]
        for home, away, date, is_home, mtype in upcoming_matches:
            Match.objects.get_or_create(
                home_team=home, away_team=away, date=date,
                defaults={
                    'is_home': is_home,
                    'match_type': mtype,
                    'season': '2024/2025',
                    'venue': 'Štadión FK Rajec' if is_home else 'ihrisko súpera',
                }
            )

        self.stdout.write('Creating trainings...')
        for i in range(1, 5):
            t_date = now + timedelta(days=i * 3)
            Training.objects.get_or_create(
                title=f'Tréning {i}',
                date=t_date,
                defaults={
                    'duration_minutes': 90,
                    'location': 'Štadión FK Rajec',
                    'description': f'Pravidelný tréning č. {i}. Zameranie na taktiku a kondíciu.',
                    'coach': coach,
                    'is_mandatory': i == 1,
                }
            )
        for i in range(1, 4):
            t_date = now - timedelta(days=i * 4)
            Training.objects.get_or_create(
                title=f'Minulý tréning {i}',
                date=t_date,
                defaults={
                    'duration_minutes': 90,
                    'location': 'Štadión FK Rajec',
                    'coach': coach,
                }
            )

        self.stdout.write('Creating news...')
        news_data = [
            ('Víťazstvo nad FC Bytča!', 'vitazstvo-nad-fc-bytca',
             'FK Rajec predviedol skvelý výkon a zvíťazil nad FC Bytča 2:1. Góly strelili Pavel Útočník a Filip Tvorivý.',
             'Skvelé víťazstvo home tímu!'),
            ('Príprava na nový ročník', 'priprava-na-novy-rocnik',
             'FK Rajec začal intenzívnu prípravu na novú sezónu 2024/2025. Tréner Ján Novák je spokojný s kondíciou mužstva.',
             'Začala sa príprava!'),
            ('Nový hráč v tíme', 'novy-hrac-v-time',
             'FK Rajec s radosťou oznamuje príchod nového hráča do tímu. Tešíme sa na jeho príspevok.',
             'Posilnenie kádra.'),
        ]
        for title, slug, content, excerpt in news_data:
            News.objects.get_or_create(
                slug=slug,
                defaults={
                    'title': title,
                    'content': content,
                    'excerpt': excerpt,
                    'author': admin,
                    'is_published': True,
                }
            )

        self.stdout.write(self.style.SUCCESS(
            '\n✅ Sample data created!\n\n'
            'Login credentials:\n'
            '  Admin:   admin / admin123\n'
            '  Tréner:  trener / trener123\n'
            '  Hráč:    hrac1 / hrac123\n'
            '  Fanúšik: fanusik / fan123\n'
        ))
