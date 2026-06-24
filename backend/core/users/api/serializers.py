from djoser.serializers import UserSerializer as DjoserUserSerializer
from drf_spectacular.utils import OpenApiExample, extend_schema_serializer
from rest_framework import serializers


class UserSerializer(DjoserUserSerializer):
    """Estende o serializer do djoser para incluir 'is_staff' no /me, permitindo
    que o frontend saiba se o usuario e administrador."""

    class Meta(DjoserUserSerializer.Meta):
        fields = tuple(DjoserUserSerializer.Meta.fields) + ('is_staff',)
        read_only_fields = tuple(
            DjoserUserSerializer.Meta.read_only_fields) + ('is_staff',)


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Logout Request',
            value={
                'refresh': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
            },
            description='Example of logout request with refresh token'
        )
    ]
)
class LogoutSerializer(serializers.Serializer):
    """
    Serializer for user logout functionality.

    Requires a valid refresh token to blacklist it and complete the logout.
    """

    refresh = serializers.CharField(
        help_text='Refresh token to be blacklisted for logout'
    )
