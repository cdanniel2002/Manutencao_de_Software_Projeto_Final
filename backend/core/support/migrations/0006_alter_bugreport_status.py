from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0005_alter_bugreport_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bugreport',
            name='status',
            field=models.CharField(
                choices=[
                    ('ABERTO', 'Aberta'),
                    ('ANALISE', 'Em análise'),
                    ('ANDAMENTO', 'Em andamento'),
                    ('CORRIGIDO', 'Corrigido'),
                    ('FECHADO', 'Fechada'),
                ],
                default='ABERTO',
                max_length=20,
            ),
        ),
    ]
