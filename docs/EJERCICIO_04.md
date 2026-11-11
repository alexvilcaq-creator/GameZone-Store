# Ejercicio 04: modelos y servicios web con Django

## Objetivo y actividades

Se preparó el backend de GameZone Store para almacenar categorías y productos en SQLite y consultar sus datos mediante servicios REST. El frontend y su diseño permanecen sin cambios; todavía no consumen la API.

| Actividad | Implementación |
| --- | --- |
| 1. Aplicación Django | Se creó `backend/catalogo/` y se registró `catalogo.apps.CatalogoConfig` en INSTALLED_APPS |
| 2. Categoría | Categoria almacena id automático, nombre único obligatorio y descripción opcional. Su método __str__ devuelve el nombre |
| 3. Producto | Producto almacena id, nombre, descripción, precio decimal, URL de imagen, cantidad disponible y categoría |
| 4. Relación | Categoria tiene muchos productos; cada Producto pertenece a una Categoria. Se usa ForeignKey con related_name="productos" y PROTECT |
| 5. Migraciones | Se generó y aplicó `catalogo/migrations/0001_initial.py` en SQLite |
| 6. Administrador | Ambos modelos se registraron con list_display y búsqueda por nombre; Producto incluye filtro por categoría, precio y cantidad en el listado |
| 7. Datos de ejemplo | Se ingresaron tres categorías y nueve productos desde formularios reales de Django Admin usando Chromium con Playwright |
| 8. Serializadores | CategoriaSerializer y ProductoSerializer utilizan ModelSerializer; el segundo incluye categoria y categoria_nombre de solo lectura |
| 9. Servicios REST | ListAPIView permite consultar categorías y productos sin habilitar escrituras públicas |
| 10. Comprobación JSON | Peticiones HTTP reales devolvieron 200 y application/json con tres categorías, nueve productos y sus relaciones correctas |

## Archivos principales

```text
backend/
├── catalogo/
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py
│   ├── admin.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── tests.py
│   └── migrations/
│       ├── __init__.py
│       └── 0001_initial.py
└── config/
    ├── settings.py   (registro de la aplicación)
    └── urls.py       (inclusión de /api/)
```

## Modelos y relación

| Modelo | Campo | Tipo y regla |
| --- | --- | --- |
| Categoria | id | BigAutoField automático |
| Categoria | nombre | CharField(100), obligatorio y único |
| Categoria | descripcion | TextField opcional |
| Producto | id | BigAutoField automático |
| Producto | nombre | CharField(150), obligatorio |
| Producto | descripcion | TextField obligatorio |
| Producto | precio | DecimalField(10, 2), mayor o igual a cero |
| Producto | imagen_url | URLField(500), obligatorio |
| Producto | cantidad_disponible | PositiveIntegerField, permite cero |
| Producto | categoria | ForeignKey obligatorio, related_name="productos", on_delete=PROTECT |

Por ejemplo, Controles puede contener Control GZ Wireless, Control GZ Pro y Control GZ Compact. Cada control pertenece solo a esa categoría. PROTECT impide borrar una categoría que todavía tenga productos; primero se deben reasignar o eliminar sus productos desde Admin.

El precio se valida con MinValueValidator y también con una restricción CHECK en la base de datos. La cantidad no admite valores negativos. Django Admin valida los campos de sus formularios y los serializadores toman las reglas del modelo. La API representa los precios como cadenas decimales para conservar sus dos posiciones.

## Instalación y ejecución en Windows 11 / PowerShell

Desde la raíz de GameZone-Store, con Python 3.12 instalado:

```powershell
cd .\backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py createsuperuser
python manage.py runserver
```

El comando createsuperuser solicita los datos de tu administrador local. Elige tu propia contraseña; no la subas al repositorio ni la incluyas en capturas. Si ya tienes un administrador, puedes utilizarlo sin crear otro.

Si PowerShell impide activar el entorno, ejecuta el intérprete directamente, por ejemplo:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py createsuperuser
.\.venv\Scripts\python.exe manage.py runserver
```

Abrir `http://127.0.0.1:8000/admin/`. La configuración es de desarrollo local; no está preparada para producción. La clave temporal de Django cambia al reiniciar el servidor si no se configura DJANGO_SECRET_KEY; puede ser necesario iniciar sesión nuevamente.

Las migraciones ya están incluidas en Git. Para verificar y ejecutar las pruebas desde backend:

```powershell
python manage.py makemigrations --check --dry-run
python manage.py test catalogo --verbosity 2
```

## Ingreso desde Django Admin

1. Iniciar sesión en /admin/.
2. En Catálogo (catalogo), abrir Categorías y pulsar Agregar.
3. Crear Videojuegos, Controles y Periféricos. La descripción es opcional.
4. Abrir Productos, pulsar Agregar y completar los campos con los datos siguientes.
5. Guardar cada formulario y comprobar el listado, la búsqueda por nombre y el filtro por categoría.

Los nueve productos siguientes se guardaron realmente mediante formularios de Admin en este entorno, no mediante fixtures ni un script de inserción en el ORM. La automatización de navegador solo completó y envió esos formularios. Se usó un superusuario temporal con contraseña aleatoria, eliminado al terminar la validación. Para tu equipo debes crear tu propio administrador.

**La base de datos local no se versiona.** Al clonar la rama en otro equipo, las migraciones crean las tablas, pero debes ingresar estos datos desde Admin. No se configura una carga automática que sustituya esa actividad del laboratorio.

| Nombre | Categoría | Descripción | Precio (S/) | Cantidad | Archivo de imagen |
| --- | --- | --- | --- | --- | --- |
| Aventura Espacial | Videojuegos | Explora nuevos mundos en este videojuego de aventura. | 189.90 | 12 | `game-space.svg` |
| Carrera Neón | Videojuegos | Compite en circuitos futuristas llenos de velocidad. | 159.90 | 10 | `game-race.svg` |
| Reinos del Alba | Videojuegos | Descubre un mundo de fantasía y estrategia. | 179.90 | 8 | `game-kingdom.svg` |
| Control GZ Wireless | Controles | Control inalámbrico con agarre cómodo para PC. | 149.90 | 20 | `control-wireless.svg` |
| Control GZ Pro | Controles | Mando USB con botones de respuesta rápida. | 199.90 | 15 | `control-pro.svg` |
| Control GZ Compact | Controles | Diseño compacto y conexión USB para PC. | 99.90 | 18 | `control-compact.svg` |
| Teclado mecánico RGB | Periféricos | Teclado USB con iluminación para tu escritorio. | 229.90 | 15 | `keyboard.svg` |
| Mouse gaming GZ | Periféricos | Sensor de sensibilidad ajustable y conexión USB. | 79.90 | 25 | `mouse.svg` |
| Audífonos GZ | Periféricos | Sonido estéreo y micrófono para tus partidas. | 119.90 | 10 | `headset.svg` |

### URL de imágenes

Para cada producto, concatenar la siguiente base con el nombre de archivo de la tabla. Las URL apuntan a los SVG ilustrativos originales del propio repositorio en un commit fijo, por lo que no dependen de que main conserve esos archivos en el futuro. No son fotos de productos reales. Todas se comprobaron mediante HTTP y devolvieron 200 con contenido SVG.

```text
https://raw.githubusercontent.com/alexvilcaq-creator/GameZone-Store/b03c82ffac86d28953a744678e8810e8e8390358/frontend/public/images/
```

Esta elección no modifica el frontend ni conecta React con el backend. Django solo almacena una URL y la incluye en el JSON; no descarga la imagen al serializar.

## Servicios REST

| Método | Ruta | Respuesta |
| --- | --- | --- |
| GET | /api/categorias/ | Arreglo de categorías |
| GET | /api/productos/ | Arreglo de productos con id de categoría y nombre asociado |

Son consultas públicas de solo lectura y devuelven JSON. POST, PUT, PATCH y DELETE responden 405. Las altas, modificaciones y bajas se realizan únicamente mediante el administrador autenticado. No se implementan rutas de detalle ni otros ejercicios.

Desde otra ventana de PowerShell, con el servidor iniciado:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/categorias/ | ConvertTo-Json -Depth 5
Invoke-RestMethod http://127.0.0.1:8000/api/productos/ | ConvertTo-Json -Depth 5
```

Ejemplo del listado de categorías (primera entrada):

```json
[
  {
    "id": 1,
    "nombre": "Videojuegos",
    "descripcion": "Categoría de videojuegos de GameZone Store."
  }
]
```

Ejemplo del listado de productos (primera entrada):

```json
[
  {
    "id": 1,
    "nombre": "Aventura Espacial",
    "descripcion": "Explora nuevos mundos en este videojuego de aventura.",
    "precio": "189.90",
    "imagen_url": "https://raw.githubusercontent.com/alexvilcaq-creator/GameZone-Store/b03c82ffac86d28953a744678e8810e8e8390358/frontend/public/images/game-space.svg",
    "cantidad_disponible": 12,
    "categoria": 1,
    "categoria_nombre": "Videojuegos"
  }
]
```

Los ids pueden ser diferentes en otra base de datos. Se omiten las demás entradas en estos ejemplos; los endpoints devuelven los arreglos completos.

## Resultados reales

| Comprobación | Resultado |
| --- | --- |
| python manage.py makemigrations catalogo | Creó 0001_initial.py |
| python manage.py migrate | Aplicó catalogo.0001_initial correctamente |
| python manage.py check | Sin problemas, 0 silenciados |
| python manage.py makemigrations --check --dry-run | No changes detected |
| python manage.py test catalogo --verbosity 2 | 12 pruebas ejecutadas y aprobadas |
| python manage.py runserver 127.0.0.1:8001 --noreload | Servidor iniciado correctamente en puerto alternativo para la validación |
| Formularios Admin en Chromium | Tres categorías y nueve productos guardados; búsqueda y filtro comprobados |
| GET /api/categorias/ por HTTP | 200 application/json, tres categorías |
| GET /api/productos/ por HTTP | 200 application/json, nueve productos, tres por categoría |
| URL de las nueve imágenes | HTTP 200 y contenido SVG válido |

Las pruebas cubren JSON público y campos, relación uno a muchos, protección de categorías, rechazo de precio negativo en modelo/base de datos/serializador, cantidad negativa, nombre de categoría único, valores cero válidos, listados vacíos y rechazo de los cuatro métodos de escritura en ambos endpoints.

Se ejecutó en Linux con Python 3.12 y Chromium. Las instrucciones de Windows deben repetirse en tu computadora. La primera lectura automatizada del filtro administrativo ocurrió antes de finalizar la navegación; se corrigió la espera del script de navegador y se verificaron los tres controles. No fue necesario modificar el filtro de Django.

## Capturas para el informe

| Evidencia | Qué capturar | Descripción sencilla |
| --- | --- | --- |
| Aplicación registrada | catalogo/ y la sección INSTALLED_APPS de settings.py | Creé una aplicación para organizar los datos de la tienda |
| Categorías y productos | models.py | Definí los campos y las validaciones de los productos |
| Relación | ForeignKey en Producto y related_name | Relacioné varios productos con una categoría y protegí las categorías utilizadas |
| Migraciones | 0001_initial.py y terminal con migrate/check | Creé las tablas y comprobé la configuración |
| Administración | admin.py y listado de categorías | Registré los modelos para ingresar datos desde el panel |
| Datos ingresados | Listado de productos, formulario de un producto y filtro Controles | Ingresé nueve productos y comprobé el filtro por categoría |
| Serializadores | serializers.py | Convertí los datos de los modelos a formato JSON |
| Servicios | views.py, catalogo/urls.py y config/urls.py | Preparé dos rutas para consultar categorías y productos |
| Respuestas | Navegador o PowerShell mostrando ambos endpoints | Verifiqué que los servicios devuelven los datos guardados |
| Pruebas | Terminal con las 12 pruebas y OK | Comprobé las relaciones, validaciones y servicios del catálogo |

Oculta usuario, contraseña, cookies y cualquier dato privado al tomar capturas del administrador. No se modificaron los Ejercicios 01 a 03, el rediseño ni el frontend. No se desarrollaron los Ejercicios 05 ni 06.
