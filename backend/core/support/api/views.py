import logging

from django.conf import settings
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from support.models import BugReport
from support.api.serializers import BugReportSerializer
from support.api.emails import enviar_email_suporte

logger = logging.getLogger(__name__)


class BugReportViewSet(viewsets.ModelViewSet):

    queryset = BugReport.objects.all()
    serializer_class = BugReportSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # O usuario nao vem do front: usamos o usuario autenticado da requisicao.
        bug_report = serializer.save(usuario=self.request.user)

        # O e-mail e "best-effort": se o envio falhar (ex.: SMTP nao configurado),
        # a solicitacao ja foi salva no banco e nao queremos quebrar a resposta.
        try:
            enviar_email_suporte(bug_report)
        except Exception:
            logger.exception(
                'Falha ao enviar e-mail de suporte para %s',
                settings.SUPPORT_EMAIL)
