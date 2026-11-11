from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        ordering = ["id"]
        verbose_name = "categoría"
        verbose_name_plural = "categorías"

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    imagen_url = models.URLField(max_length=500)
    cantidad_disponible = models.PositiveIntegerField()
    categoria = models.ForeignKey(
        Categoria, related_name="productos", on_delete=models.PROTECT,
    )

    class Meta:
        ordering = ["id"]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(precio__gte=0), name="producto_precio_no_negativo",
            ),
        ]

    def __str__(self):
        return self.nombre
