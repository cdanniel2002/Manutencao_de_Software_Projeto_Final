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
        # Definidos pelo servidor, nao pelo front: o usuario vem da requisicao
        # autenticada e status/criado_em sao controlados pelo backend.
        read_only_fields = ['usuario', 'status', 'criado_em']