from rest_framework import viewsets

from support.models import BugReport
from support.api.serializers import BugReportSerializer

class BugReportViewSet(viewsets.ModelViewSet):

    queryset = BugReport.objects.all()
    serializer_class = BugReportSerializer