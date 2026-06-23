import logging

from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone

logger = logging.getLogger(__name__)


def enviar_email_suporte(bug_report):
    """Envia a solicitacao de suporte (problema/melhoria) para o e-mail da
    plataforma, com todos os dados informados pelo usuario e o anexo (se houver).
    """
    usuario = bug_report.usuario
    nome_usuario = getattr(usuario, 'name', '') or '-'
    email_usuario = getattr(usuario, 'email', '') or '-'
    telefone_usuario = getattr(usuario, 'phone_number', '') or '-'

    tipo_legivel = bug_report.get_tipo_display()
    data_legivel = timezone.localtime(bug_report.criado_em).strftime(
        '%d/%m/%Y %H:%M')

    assunto = f'[Suporte FinanSee] [{tipo_legivel}] {bug_report.titulo}'

    corpo = (
        'Nova solicitacao de suporte recebida no FinanSee.\n'
        '\n'
        '=== Solicitacao ===\n'
        f'Tipo: {tipo_legivel}\n'
        f'Titulo: {bug_report.titulo}\n'
        f'Pagina: {bug_report.pagina or "-"}\n'
        f'Status: {bug_report.get_status_display()}\n'
        f'Data: {data_legivel}\n'
        '\n'
        'Descricao:\n'
        f'{bug_report.descricao}\n'
        '\n'
        '=== Usuario ===\n'
        f'Nome: {nome_usuario}\n'
        f'E-mail: {email_usuario}\n'
        f'Telefone: {telefone_usuario}\n'
    )

    email = EmailMessage(
        subject=assunto,
        body=corpo,
        from_email=settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER,
        to=[settings.SUPPORT_EMAIL],
        # Permite que a equipe responda direto para o usuario.
        reply_to=[email_usuario] if '@' in email_usuario else None,
    )

    if bug_report.anexo:
        try:
            bug_report.anexo.open('rb')
            nome_arquivo = bug_report.anexo.name.split('/')[-1]
            email.attach(nome_arquivo, bug_report.anexo.read())
        finally:
            bug_report.anexo.close()

    email.send(fail_silently=False)
    logger.info('E-mail de suporte enviado para %s', settings.SUPPORT_EMAIL)
