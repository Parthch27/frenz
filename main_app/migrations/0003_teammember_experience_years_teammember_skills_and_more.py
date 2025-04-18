# Generated by Django 5.2 on 2025-04-09 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_teammember'),
    ]

    operations = [
        migrations.AddField(
            model_name='teammember',
            name='experience_years',
            field=models.PositiveIntegerField(default=0, help_text='Years of experience'),
        ),
        migrations.AddField(
            model_name='teammember',
            name='skills',
            field=models.CharField(blank=True, help_text='Comma-separated list of skills', max_length=255),
        ),
        migrations.AddField(
            model_name='teammember',
            name='slug',
            field=models.SlugField(blank=True, max_length=100, unique=True),
        ),
    ]
