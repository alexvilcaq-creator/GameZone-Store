from django.contrib import admin

from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "descripcion")
    search_fields = ("nombre",)


class StockFilter(admin.SimpleListFilter):
    title = "inventario"
    parameter_name = "stock"

    def lookups(self, request, model_admin):
        return [("agotado", "Agotado"), ("bajo", "Stock bajo (1 a 5)"), ("disponible", "Más de 5 unidades")]

    def queryset(self, request, queryset):
        if self.value() == "agotado":
            return queryset.filter(cantidad_disponible=0)
        if self.value() == "bajo":
            return queryset.filter(cantidad_disponible__range=(1, 5))
        if self.value() == "disponible":
            return queryset.filter(cantidad_disponible__gt=5)
        return queryset


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "categoria", "precio", "descuento_porcentaje", "precio_final", "cantidad_disponible")
    search_fields = ("nombre",)
    list_filter = ("categoria", StockFilter)
    list_editable = ("cantidad_disponible", "descuento_porcentaje")
    list_select_related = ("categoria",)
