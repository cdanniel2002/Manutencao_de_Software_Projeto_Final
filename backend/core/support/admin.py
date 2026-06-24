from django.contrib import admin

from support.models import BugReport


@admin.register(BugReport)
class BugReportAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'status', 'usuario', 'criado_em')
    list_filter = ('tipo', 'status', 'criado_em')
    search_fields = ('titulo', 'descricao', 'usuario__email', 'usuario__name')
    list_editable = ('status',)
    ordering = ('-criado_em',)
    date_hierarchy = 'criado_em'
    # Os dados enviados pelo usuario nao devem ser editados pelo admin;
    # apenas o "status" da solicitacao pode ser alterado.
    readonly_fields = (
        'usuario', 'titulo', 'tipo', 'descricao', 'anexo', 'pagina', 'criado_em',
    )
