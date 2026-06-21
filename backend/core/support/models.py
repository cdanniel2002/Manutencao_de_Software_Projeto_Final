from django.db import models
from django.conf import settings


class BugReport(models.Model):

    TIPO_CHOICES = [
        ('PROBLEMA', 'Reportar Problema'),
        ('MELHORIA', 'Sugerir Melhoria'),
    ]

    STATUS_CHOICES = [
        ('ABERTO', 'Aberto'),
        ('ANALISE', 'Em análise'),
        ('CORRIGIDO', 'Corrigido'),
        ('FECHADO', 'Fechado'),
    ]

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    titulo = models.CharField(max_length=150)

    tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        default='PROBLEMA'
    )

    descricao = models.TextField()

    anexo = models.FileField(
        upload_to='bug_reports/',
        blank=True,
        null=True
    )

    pagina = models.CharField(
        max_length=255,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ABERTO'
    )

    criado_em = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"[{self.tipo}] {self.titulo}"