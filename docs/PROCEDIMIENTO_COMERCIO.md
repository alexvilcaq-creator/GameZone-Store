# Ampliación de GameZone Store: inventario, búsqueda y marketing

## Objetivos, público y características

**Objetivo general:** ampliar el catálogo del Laboratorio 13 para que una persona pueda encontrar productos, conocer su disponibilidad y descubrir promociones y recomendaciones.

**Objetivos específicos:** mantener la navegación móvil, administrar existencias de forma básica, combinar búsqueda y categorías, mostrar descuentos verificables y ofrecer una selección recomendada según reglas claras.

**Público objetivo:** aficionados a los videojuegos y estudiantes que buscan videojuegos, controles y periféricos para PC o consola. La moneda del catálogo es el sol peruano.

**Características clave:** catálogo conectado a Django REST Framework y SQLite, búsqueda sin recarga, filtros dinámicos, precios en soles, disponibilidad, promociones administrables, recomendaciones por categoría y diseño responsive.

## Implementaciones

| Requisito | Solución |
| --- | --- |
| Responsive y móvil | Se conserva la cuadrícula adaptable, el encabezado, el foco de teclado y los filtros; se revisaron anchos de 320, 390, 768 y 1440 px |
| Gestión de inventario | Django Admin permite editar cantidad disponible desde el listado o formulario. Un filtro distingue agotados, stock bajo de 1 a 5 y más de 5 unidades |
| Visualización | ProductCard conserva nombre, imagen, categoría y descripción, e incorpora disponibilidad y precio final |
| Filtrado y búsqueda | El buscador del header ahora funciona. Busca una subcadena en nombre, descripción o categoría, ignorando tildes, mayúsculas y espacios externos; se combina con la categoría por id |
| Marketing y descuentos | Se agregó descuento_porcentaje a Producto. Django calcula precio_final con Decimal y redondeo a dos posiciones. Se muestran porcentaje, precio original tachado y precio final |
| Promociones | La sección Ofertas presenta únicamente descuentos mayores a cero con stock. Si no existen, se informa sin inventar promociones |
| Recomendaciones | Se sugieren hasta tres productos con stock, de la categoría seleccionada si existe. Se ordenan por descuento, luego por cantidad disponible y finalmente por id |

## Inventario básico

El personal accede a `/admin/`, abre Productos y puede modificar cantidad_disponible y descuento_porcentaje en el listado y pulsar Guardar. También puede editar un producto desde su formulario. Los valores negativos de stock están prohibidos por el modelo existente. En la tienda:

- Cantidad 0: **Agotado**.
- Cantidad de 1 a 5: **Últimas N unidades**.
- Más de 5: **Disponible · N unidades**.

Esta implementación es gestión básica de cantidades; no incluye historial de movimientos, reservas ni descuento automático de existencias al comprar. No hay compras o pedidos implementados. Las escrituras permanecen dentro del administrador autenticado; la API pública sigue siendo de solo lectura.

## Promociones

Se añadió una migración no destructiva: `backend/catalogo/migrations/0002_producto_descuento_porcentaje_and_more.py`. Los registros existentes reciben descuento 0 por defecto. El campo admite enteros de 0 a 100 con validación y restricción en la base de datos. Un descuento de 0 desactiva la promoción.

Ejemplo: un producto de S/ 189.90 con descuento del 10 % tiene precio final **S/ 170.91**. El backend es la fuente del cálculo y el serializador expone descuento_porcentaje y precio_final; React no inventa un importe diferente.

Para probarlo en tu equipo, ingresa un porcentaje desde Admin, guarda y pulsa Actualizar catálogo en React. Los descuentos no tienen fechas de vencimiento automáticas: permanecen activos hasta establecer nuevamente 0. Los agotados siguen visibles en el catálogo general, pero se excluyen de promociones y recomendaciones.

**Los descuentos y cantidades utilizados en las capturas fueron cambios temporales de prueba desde Admin y se restauraron.** No se dejaron promociones artificiales activas en los datos existentes. Al clonar la rama no se descarga una base SQLite; debes registrar tus productos y configurar sus descuentos desde Admin.

## Sistema de recomendación

Es un sistema básico por reglas, sin inteligencia artificial, perfiles, historial ni popularidad inventada. Su función es `recomendarProductos` en `frontend/src/lib/catalogo.js`. Cambiar la categoría modifica la selección recomendada. La búsqueda afecta al catálogo principal; las recomendaciones siguen la categoría y la disponibilidad, tal como explica su texto visible.

No se recomiendan agotados y no se modifica el arreglo original al ordenarlo. Si no hay candidatos se muestra un mensaje. Esta solución puede ampliarse en el futuro con preferencias explícitas y métricas reales, respetando la privacidad.

## Archivos relevantes

- `backend/catalogo/models.py`: porcentaje, restricciones y cálculo decimal del precio final.
- `backend/catalogo/admin.py`: edición de existencias y descuentos, filtro de inventario y precio final.
- `backend/catalogo/serializers.py`: exposición de los nuevos campos.
- `backend/catalogo/tests.py`: pruebas de descuentos y contrato JSON ampliado.
- `frontend/src/lib/catalogo.js`: búsqueda y recomendaciones por reglas.
- `frontend/src/App.jsx`: estado de búsqueda, combinación con categoría, ofertas y recomendaciones.
- `frontend/src/components/Header.jsx`: búsqueda funcional y accesible.
- `frontend/src/components/ProductCard.jsx`: precio anterior/final, descuento y disponibilidad.
- `frontend/src/components/ProductList.jsx`: mensajes vacíos reutilizables.
- `frontend/src/pages/Home.jsx`: limpieza de filtros, promociones y recomendaciones.
- `frontend/tests/catalogo.test.js`: pruebas de búsqueda y recomendaciones con el runner de Node.

No se crearon cuentas de clientes, carrito, compras, pagos ni pedidos. No se restauraron documentos que ya estaban eliminados en main; este documento cubre exclusivamente el nuevo procedimiento.

## Instalación y ejecución en Windows 11 / PowerShell

Utiliza Node.js 24 y Python 3.12. Desde la raíz, primera terminal:

```powershell
cd backend
# Solo si no existe el entorno virtual:
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py runserver 127.0.0.1:8000
```

Si la activación está bloqueada, usa `.\.venv\Scripts\python.exe` en lugar de python. Crea tu administrador con `python manage.py createsuperuser` si no tienes uno. No compartas la contraseña.

Segunda terminal desde la raíz:

```powershell
cd frontend
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abre `http://127.0.0.1:5173` y deja ambos servidores abiertos. Los datos se administran en `http://127.0.0.1:8000/admin/`. Mantén VITE_API_URL y los orígenes CORS configurados como en el proyecto. Para ver cambios de stock o descuentos guardados, pulsa Actualizar catálogo.

## Resultados reales de validación

| Comprobación | Resultado |
| --- | --- |
| npm run build | Correcto |
| npm run lint | Correcto, sin avisos |
| npm test desde frontend | 4 pruebas aprobadas: búsqueda, combinación de filtros, exclusión de agotados y orden/límite de recomendaciones |
| python manage.py check | Sin problemas |
| python manage.py test catalogo | 18 pruebas aprobadas, incluyendo precio final, redondeo y descuentos inválidos |
| Migración | Aplicada sin eliminar productos ni categorías |
| makemigrations --check --dry-run | Sin cambios pendientes |
| Búsqueda en Chromium | Buscar mecanico encontró Teclado mecánico RGB; combinación con Controles mostró cero resultados y Limpiar filtros restauró el catálogo |
| Inventario real desde Admin | Se cambió un producto a 2 unidades y luego 0; React mostró Últimas 2 unidades y Agotado al actualizar |
| Promoción real desde Admin | Se asignó 10 % temporalmente, se comprobó el precio final y su presencia en Ofertas |
| Recomendaciones | Producto con descuento y stock priorizado; agotado excluido de recomendaciones y promociones |
| Responsive | 320, 390, 768 y 1440 px sin desbordamiento horizontal |
| Restauración | Stock y descuentos originales comparados y restaurados; administrador temporal eliminado |

La navegación y las ediciones utilizaron realmente Django, SQLite y los formularios de Admin. Las pruebas unitarias utilizan datos aislados y la base de pruebas de Django, sin borrar registros del catálogo.

**Limitaciones:** se probó Linux/Chromium, no Windows ni otros navegadores. Las imágenes externas del catálogo siguen fallando en Chromium del entorno y se muestran con el respaldo local ya existente; no se desactivó TLS ni se alteraron sus URL. En tu equipo comprueba los enlaces de imágenes y configura recursos válidos desde Admin. No hay tareas programadas para expirar descuentos ni un registro de movimientos de inventario.

## Capturas y descripciones para el informe

Las capturas están en `docs/evidencias/`. Las vistas de código muestran el contenido real del archivo en una vista de fuente, no una captura del editor VS Code. Las capturas de descuentos y stock documentan una prueba temporal, no una promoción que permanezca activa después de instalar.

| Evidencia | Descripción lista para el informe |
| --- | --- |
| [codigo-modelos.png](evidencias/codigo-modelos.png) | Amplié el modelo Producto con un porcentaje de descuento y calculé el precio final con dos decimales, validando el rango permitido |
| [codigo-busqueda-recomendacion.png](evidencias/codigo-busqueda-recomendacion.png) | Implementé la búsqueda sin distinguir tildes ni mayúsculas y un sistema de recomendaciones basado en categoría, stock y descuentos |
| [busqueda.png](evidencias/busqueda.png) | Busqué un producto por sus características y comprobé que el catálogo muestra los resultados sin recargar la página |
| [inventario-admin.png](evidencias/inventario-admin.png) | Actualicé cantidades desde Django Admin y utilicé el filtro de stock bajo para identificar productos con pocas unidades |
| [promociones.png](evidencias/promociones.png) | Configuré temporalmente un descuento del 10 % y comprobé el precio original, el precio final y la disponibilidad |
| [recomendaciones.png](evidencias/recomendaciones.png) | Verifiqué que la aplicación recomienda productos disponibles y prioriza los descuentos |
| [movil.png](evidencias/movil.png) | Comprobé que la aplicación mantiene una presentación adaptable en un ancho de celular |

Para completar las evidencias del proceso en tu equipo, captura también `python manage.py migrate`, `npm run build`, `npm run lint`, `npm test` y `python manage.py test catalogo` con sus resultados reales. Puedes tomar capturas adicionales de models.py, admin.py y catalogo.js en tu editor. No incluyas credenciales, cookies ni datos privados.
