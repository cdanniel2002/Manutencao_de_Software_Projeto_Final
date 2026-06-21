from rest_framework import serializers
from support.models import BugReport


class BugReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = BugReport
        fields = [
            'id',
            'usuario',
            'titulo',
            'tipo',
            'descricao',
            'anexo',
            'pagina',
            'status',
            'criado_em'
        ]