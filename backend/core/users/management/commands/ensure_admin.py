import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Garante que exista um superusuario admin para acessar o painel /admin/.

    Credenciais vem de variaveis de ambiente (com padroes para facilitar):
      - ADMIN_EMAIL    (padrao: admin@finansee.com)
      - ADMIN_PASSWORD (padrao: danniel123)
      - ADMIN_NAME     (padrao: Administrador)

    E idempotente: roda em todo deploy criando ou atualizando o admin.
    """

    help = 'Cria ou atualiza o superusuario admin a partir de variaveis de ambiente.'

    def handle(self, *args, **options):
        User = get_user_model()

        email = os.environ.get('ADMIN_EMAIL', 'admin@finansee.com')
        password = os.environ.get('ADMIN_PASSWORD', 'danniel123')
        name = os.environ.get('ADMIN_NAME', 'Administrador')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={'name': name},
        )

        user.name = user.name or name
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(password)
        user.save()

        acao = 'criado' if created else 'atualizado'
        self.stdout.write(self.style.SUCCESS(
            f'Superusuario admin {acao}: {email}'))
