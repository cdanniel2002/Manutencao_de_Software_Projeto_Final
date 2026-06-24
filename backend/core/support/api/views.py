from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from support.models import BugReport
from support.api.serializers import BugReportSerializer


class BugReportViewSet(viewsets.ModelViewSet):

    serializer_class = BugReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Administradores (staff) veem todas as solicitacoes; cada usuario comum
        # ve apenas as proprias. O gerenciamento completo e feito no /admin/.
        user = self.request.user
        if user.is_staff:
            return BugReport.objects.all()
        return BugReport.objects.filter(usuario=user)

    def perform_create(self, serializer):
        # Salva a solicitacao vinculada ao usuario autenticado. Sem envio de
        # e-mail: as solicitacoes ficam no banco e sao vistas no painel admin.
        serializer.save(usuario=self.request.user)
