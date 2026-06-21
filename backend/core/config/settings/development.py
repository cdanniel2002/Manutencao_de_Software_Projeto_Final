from .base import *

DEBUG = True

SECRET_KEY = 'django-insecure-*_n9rhh6)*li)qt3#2&43w5k1&fo_vk#o!p^ifb+6k=ho7q@l0'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

# O backend de e-mail vem do .env (SMTP real se EMAIL_HOST_USER/PASSWORD
# estiverem preenchidos; caso contrário cai no console para o cadastro não
# depender de envio de e-mail).
_smtp_configured = EMAIL_HOST_USER not in ('', 'Your Email')
if not _smtp_configured:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DJOSER = {
    **DJOSER,
    # O frontend não tem página de ativação (/activate/...), então a conta já
    # nasce ativa e enviamos apenas o e-mail de notificação de cadastro.
    'SEND_ACTIVATION_EMAIL': False,
    'SEND_CONFIRMATION_EMAIL': _smtp_configured,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': False,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': False,
}
