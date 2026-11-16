from rest_framework import serializers

from .models import Categoria, Producto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ("id", "nombre", "descripcion")


class ProductoSerializer(serializers.ModelSerializer):
    precio_final = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)

    class Meta:
        model = Producto
        fields = (
            "id", "nombre", "descripcion", "precio", "imagen_url",
            "cantidad_disponible", "categoria", "categoria_nombre",
            "descuento_porcentaje", "precio_final",
        )
