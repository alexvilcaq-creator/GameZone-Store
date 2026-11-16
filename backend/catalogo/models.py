from decimal import Decimal, ROUND_HALF_UP

from django.core.validators import MaxValueValidator, MinValueValidator
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
    descuento_porcentaje = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(100)],
        help_text="Porcentaje entre 0 y 100; 0 desactiva la promoción.",
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
                condition=models.Q(descuento_porcentaje__gte=0, descuento_porcentaje__lte=100),
                name="producto_descuento_entre_0_y_100",
            ),
            models.CheckConstraint(
                condition=models.Q(precio__gte=0), name="producto_precio_no_negativo",
            ),
        ]

    def __str__(self):
        return self.nombre

    @property
    def precio_final(self):
        return (self.precio * (Decimal(100) - self.descuento_porcentaje) / Decimal(100)).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP,
        )
