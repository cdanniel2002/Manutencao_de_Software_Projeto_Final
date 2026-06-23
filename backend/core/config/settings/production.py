import os

from .base import *

DEBUG = config('DEBUG', default=False, cast=bool)

# Hostname publico que o Render injeta automaticamente
# (ex.: finansee-backend-njyn.onrender.com). Usado para preencher
# ALLOWED_HOSTS e CSRF_TRUSTED_ORIGINS sem configuracao manual.
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS',
                                cast=bool,
                                default=False)

if not CORS_ALLOW_ALL_ORIGINS:
    CORS_ALLOWED_ORIGINS = config(
        'CORS_ALLOWED_ORIGINS',
        cast=lambda v: [s.strip()for s in v.split(',')],
        default=[])

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    cast=lambda v: [s.strip() for s in v.split(',') if s.strip()],
    default='')

# Garante que o proprio dominio do Render esteja sempre permitido, mesmo que
# ALLOWED_HOSTS nao tenha sido configurado manualmente.
if RENDER_EXTERNAL_HOSTNAME and RENDER_EXTERNAL_HOSTNAME not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Dominios confiaveis para requisicoes que passam pelo CSRF (admin, djoser, etc.)
# Ex.: 'https://meu-backend.onrender.com, https://meu-front.vercel.app'
CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    cast=lambda v: [s.strip() for s in v.split(',') if s.strip()],
    default='')

# Adiciona automaticamente a origem HTTPS do proprio backend no Render.
if RENDER_EXTERNAL_HOSTNAME:
    _render_origin = f'https://{RENDER_EXTERNAL_HOSTNAME}'
    if _render_origin not in CSRF_TRUSTED_ORIGINS:
        CSRF_TRUSTED_ORIGINS.append(_render_origin)

# O Render (e a maioria das PaaS) termina o TLS num proxy reverso e repassa a
# requisicao em HTTP para o container. Este header faz o Django entender que a
# conexao original era HTTPS (cookies seguros, links de e-mail do djoser, etc.).
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Servir arquivos estaticos (admin, swagger, etc.) direto pelo Django via
# WhiteNoise, sem precisar de Apache/Nginx separado.
MIDDLEWARE.insert(
    MIDDLEWARE.index('django.middleware.security.SecurityMiddleware') + 1,
    'whitenoise.middleware.WhiteNoiseMiddleware',
)

STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage',
    },
}
