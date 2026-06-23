from .base import *

DEBUG = config('DEBUG', default=False, cast=bool)

CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS',
                                cast=bool,
                                default=False)

if not CORS_ALLOW_ALL_ORIGINS:
    CORS_ALLOWED_ORIGINS = config(
        'CORS_ALLOWED_ORIGINS',
        cast=lambda v: [s.strip()for s in v.split(',')],
        default=[])

SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config('ALLOWED_HOSTS',
                       cast=lambda v: [s.strip() for s in v.split(',')])

# Dominios confiaveis para requisicoes que passam pelo CSRF (admin, djoser, etc.)
# Ex.: 'https://meu-backend.onrender.com, https://meu-front.vercel.app'
CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    cast=lambda v: [s.strip() for s in v.split(',') if s.strip()],
    default='')

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
