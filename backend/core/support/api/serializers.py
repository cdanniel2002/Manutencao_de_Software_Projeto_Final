from rest_framework import serializers
from support.models import BugReport


class BugReportSerializer(serializers.ModelSerializer):

    usuario_nome = serializers.CharField(source='usuario.name', read_only=True)
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    status_display = serializers.CharField(
        source='get_status_display', read_only=True)

    class Meta:
        model = BugReport
        fields = [
            'id',
            'usuario',
            'usuario_nome',
            'usuario_email',
            'titulo',
            'tipo',
            'tipo_display',
            'descricao',
            'anexo',
            'pagina',
            'status',
            'status_display',
            'criado_em'
        ]
        # O usuario vem da requisicao autenticada e a data e automatica.
        # O 'status' fica editavel para o admin alterar (Aberto -> Corrigido...).
        read_only_fields = ['usuario', 'criado_em']
