from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import User, Training, News, Player


class LoginForm(AuthenticationForm):
    username = forms.CharField(
        label='Používateľské meno',
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Používateľské meno'})
    )
    password = forms.CharField(
        label='Heslo',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Heslo'})
    )


class RegisterForm(UserCreationForm):
    first_name = forms.CharField(
        label='Meno',
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Meno'})
    )
    last_name = forms.CharField(
        label='Priezvisko',
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Priezvisko'})
    )
    email = forms.EmailField(
        label='E-mail',
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'E-mail'})
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Používateľské meno'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control', 'placeholder': 'Heslo'}
        )
        self.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control', 'placeholder': 'Potvrďte heslo'}
        )
        self.fields['password1'].label = 'Heslo'
        self.fields['password2'].label = 'Potvrďte heslo'


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'bio', 'avatar']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            'bio': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'avatar': forms.FileInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'first_name': 'Meno',
            'last_name': 'Priezvisko',
            'email': 'E-mail',
            'phone': 'Telefón',
            'bio': 'O mne',
            'avatar': 'Profilová fotka',
        }


class TrainingForm(forms.ModelForm):
    class Meta:
        model = Training
        fields = ['title', 'date', 'duration_minutes', 'location', 'description', 'is_mandatory']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'date': forms.DateTimeInput(attrs={'class': 'form-control', 'type': 'datetime-local'}),
            'duration_minutes': forms.NumberInput(attrs={'class': 'form-control'}),
            'location': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'is_mandatory': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
        labels = {
            'title': 'Názov tréningu',
            'date': 'Dátum a čas',
            'duration_minutes': 'Trvanie (minúty)',
            'location': 'Miesto',
            'description': 'Popis',
            'is_mandatory': 'Povinný tréning',
        }


class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = ['title', 'slug', 'content', 'excerpt', 'image', 'is_published']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'slug': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 10}),
            'excerpt': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'image': forms.FileInput(attrs={'class': 'form-control'}),
            'is_published': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
        labels = {
            'title': 'Nadpis',
            'slug': 'URL slug',
            'content': 'Obsah',
            'excerpt': 'Krátky popis',
            'image': 'Obrázok',
            'is_published': 'Publikované',
        }


class UserRoleForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['role']
        widgets = {
            'role': forms.Select(attrs={'class': 'form-select'}),
        }
        labels = {
            'role': 'Rola',
        }
