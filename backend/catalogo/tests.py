from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from django.db.models.deletion import ProtectedError
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Categoria, Producto
from .serializers import ProductoSerializer


def producto_data(categoria):
    return dict(
        nombre="Control GZ", descripcion="Control de prueba",
        precio=Decimal("149.90"), imagen_url="https://example.com/control.svg",
        cantidad_disponible=5, categoria=categoria,
    )


class ModelosTests(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre="Controles")

    def test_relacion_uno_a_muchos_y_nombres(self):
        primero = Producto.objects.create(**producto_data(self.categoria))
        segundo = Producto.objects.create(**producto_data(self.categoria))
        self.assertEqual(list(self.categoria.productos.all()), [primero, segundo])
        self.assertEqual(str(self.categoria), "Controles")
        self.assertEqual(str(primero), "Control GZ")

    def test_categoria_con_productos_no_se_elimina(self):
        Producto.objects.create(**producto_data(self.categoria))
        with self.assertRaises(ProtectedError):
            self.categoria.delete()

    def test_precio_negativo_rechazado_por_validacion(self):
        producto = Producto(**producto_data(self.categoria))
        producto.precio = Decimal("-0.01")
        with self.assertRaises(ValidationError):
            producto.full_clean()

    def test_precio_negativo_rechazado_por_base_de_datos(self):
        data = producto_data(self.categoria)
        data["precio"] = Decimal("-1.00")
        with self.assertRaises(IntegrityError), transaction.atomic():
            Producto.objects.create(**data)

    def test_cantidad_negativa_rechazada(self):
        producto = Producto(**producto_data(self.categoria))
        producto.cantidad_disponible = -1
        with self.assertRaises(ValidationError):
            producto.full_clean()

    def test_categoria_nombre_unico(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            Categoria.objects.create(nombre="Controles")

    def test_precio_y_cantidad_cero_validos(self):
        producto = Producto(**producto_data(self.categoria))
        producto.precio = Decimal("0.00")
        producto.cantidad_disponible = 0
        producto.full_clean()
        producto.save()

    def test_serializer_rechaza_precio_negativo(self):
        data = producto_data(self.categoria)
        data.update(categoria=self.categoria.pk, precio="-1.00")
        serializer = ProductoSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("precio", serializer.errors)


class ListadosTests(APITestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre="Controles")
        self.producto = Producto.objects.create(**producto_data(self.categoria))

    def test_categorias_json_publico(self):
        response = self.client.get(reverse("catalogo:categorias"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/json")
        self.assertEqual(response.json(), [
            {"id": self.categoria.pk, "nombre": "Controles", "descripcion": ""},
        ])

    def test_productos_json_publico_y_relacion(self):
        response = self.client.get(reverse("catalogo:productos"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/json")
        self.assertEqual(response.json(), [{
            "id": self.producto.pk, "nombre": "Control GZ",
            "descripcion": "Control de prueba", "precio": "149.90",
            "imagen_url": "https://example.com/control.svg",
            "cantidad_disponible": 5, "categoria": self.categoria.pk,
            "categoria_nombre": "Controles",
        }])

    def test_listados_vacios(self):
        Producto.objects.all().delete()
        Categoria.objects.all().delete()
        for name in ("categorias", "productos"):
            response = self.client.get(reverse(f"catalogo:{name}"))
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), [])

    def test_api_no_permite_escritura(self):
        for name in ("categorias", "productos"):
            for method in ("post", "put", "patch", "delete"):
                with self.subTest(endpoint=name, method=method):
                    response = getattr(self.client, method)(
                        reverse(f"catalogo:{name}"), {}, format="json",
                    )
                    self.assertEqual(response.status_code, 405)
        self.assertEqual(Producto.objects.count(), 1)
        self.assertEqual(Categoria.objects.count(), 1)
