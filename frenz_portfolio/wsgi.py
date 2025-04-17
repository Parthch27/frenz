"""
WSGI config for frenz_portfolio project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'frenz_portfolio.settings')

application = get_wsgi_application()
