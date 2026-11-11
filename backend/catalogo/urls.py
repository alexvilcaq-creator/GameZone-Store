from django.urls import path

from .views import CategoriaListView, ProductoListView

app_name = "catalogo"
urlpatterns = [
    path("categorias/", CategoriaListView.as_view(), name="categorias"),
    path("productos/", ProductoListView.as_view(), name="productos"),
]
