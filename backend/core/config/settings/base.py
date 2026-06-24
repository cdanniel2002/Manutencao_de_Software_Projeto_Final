import os
from datetime import timedelta
from pathlib import Path

from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent.parent

CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='')

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LOCAL_APPS = [
    'categories',
    'expenses',
    'periods',
    'users',
    'support',
]

THIRD_PARTY_APPS = [
    'anymail',
    'corsheaders',
    'django_filters',
    'djoser',
    'drf_spectacular',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
]

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS + THIRD_PARTY_APPS

AUTH_USER_MODEL = 'users.User'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'context_processors.context_processors.backend_url_context',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'templates/static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Em producao no Render, se BACKEND_URL nao for definido, usa a URL publica que
# o proprio Render injeta automaticamente (RENDER_EXTERNAL_URL).
BACKEND_URL = config(
    'BACKEND_URL',
    default=os.environ.get('RENDER_EXTERNAL_URL', 'http://localhost:8000'))

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Prioridade de configuracao do banco:
# 1) DATABASE_URL (formato usado pelo Render/Heroku: postgres://user:pass@host:port/db)
# 2) USE_POSTGRESQL=True + variaveis DB_* separadas (docker-compose local)
# 3) SQLite (desenvolvimento)
DATABASE_URL = config('DATABASE_URL', default='')

if DATABASE_URL:
    import dj_database_url

    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=config('DB_SSL_REQUIRE', cast=bool, default=True),
        )
    }
elif config('USE_POSTGRESQL', cast=bool, default=False):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST'),
            'PORT': config('DB_PORT'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', cast=int, default=587)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', cast=bool, default=True)
# Timeout curto: se a porta SMTP estiver bloqueada (ex.: Render bloqueia saida
# SMTP), o envio falha rapido em vez de travar o worker ate o gunicorn mata-lo.
EMAIL_TIMEOUT = config('EMAIL_TIMEOUT', cast=int, default=10)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
# Remetente padrao. Precisa ser um remetente verificado no Brevo.
DEFAULT_FROM_EMAIL = config(
    'DEFAULT_FROM_EMAIL',
    default=EMAIL_HOST_USER or 'carlosdanniel2002@outlook.com')

# E-mail da equipe que recebe as solicitacoes de suporte/feedback dos usuarios.
SUPPORT_EMAIL = config(
    'SUPPORT_EMAIL',
    default='carlosdanniel2002@outlook.com')

# Selecao do backend de e-mail, em ordem de prioridade:
# 1) Brevo via HTTP API (django-anymail) -> funciona no Render, que bloqueia SMTP.
# 2) SMTP tradicional (Gmail/Outlook) -> util em servidor proprio sem bloqueio.
# 3) Console (apenas imprime no log) -> nao derruba o deploy sem e-mail configurado.
BREVO_API_KEY = config('BREVO_API_KEY', default='')

if BREVO_API_KEY:
    EMAIL_BACKEND = 'anymail.backends.brevo.EmailBackend'
    ANYMAIL = {'BREVO_API_KEY': BREVO_API_KEY}
    EMAIL_CONFIGURED = True
elif EMAIL_HOST_USER and EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = config(
        'EMAIL_BACKEND',
        default='django.core.mail.backends.smtp.EmailBackend')
    EMAIL_CONFIGURED = True
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    EMAIL_CONFIGURED = False


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(weeks=1),
    'ROTATE_REFRESH_TOKENS': False,
}


SPECTACULAR_SETTINGS = {
    'TITLE': 'FinanSee API',
    'DESCRIPTION': 'FinanSee é uma aplicação web desenvolvida para auxiliar \
                    no gerenciamento financeiro e orçamentário pessoal. Em um \
                    cenário econômico frequentemente incerto, onde a busca \
                    por estabilidade financeira é constante, o FinanSee surge \
                    como uma solução eficaz e intuitiva. Nosso objetivo é \
                    capacitar os usuários a controlar suas finanças de \
                    maneira organizada, prática e segura, facilitando o \
                    alcance de metas financeiras e promovendo a educação \
                    financeira.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'CONTACT': {
        'name': 'Lidiana Costa',
        'email': 'lidiana.souza@alunos.ufersa.edu.br',
        'url': 'https://github.com/Lidianacosta'
    },
}


DJOSER = {
    # O frontend nao tem pagina de ativacao (/activate/...), entao a conta nasce
    # ativa e o login funciona logo apos o cadastro. Mantido desligado por padrao
    # e independente do SMTP (configurar e-mail para o suporte nao quebra o login).
    # Para ligar a ativacao no futuro, defina SEND_ACTIVATION_EMAIL=True no ambiente.
    'SEND_ACTIVATION_EMAIL': config('SEND_ACTIVATION_EMAIL', default=False, cast=bool),
    'SEND_CONFIRMATION_EMAIL': config('SEND_CONFIRMATION_EMAIL', default=False, cast=bool),
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'ACTIVATION_URL': 'activate/{uid}/{token}/',
    'PASSWORD_RESET_CONFIRM_URL': 'reset_password/{uid}/{token}/',
    'USERNAME_RESET_CONFIRM_URL': 'reset_username/{uid}/{token}/',
    'LOGOUT_ON_PASSWORD_CHANGE': False,
    'LOGIN_FIELD': 'email',
    'EMAIL_FRONTEND_PROTOCOL': config('DJOSER_EMAIL_FRONTEND_PROTOCOL', default='https'),
    'EMAIL_FRONTEND_DOMAIN': config('DJOSER_EMAIL_FRONTEND_DOMAIN', default='localhost:3000'),
    'EMAIL_FRONTEND_SITE_NAME': config('DJOSER_EMAIL_FRONTEND_SITE_NAME', default='FinanSee'),
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'USERNAME_RESET_CONFIRM_RETYPE': True,
    'TOKEN_MODEL': None,
}
