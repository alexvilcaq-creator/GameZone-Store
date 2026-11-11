# Ejercicio 06: personalización y verificación de la aplicación

## Objetivo

Se revisó GameZone Store conservando el rediseño y la integración del Ejercicio 05. Se realizaron ajustes puntuales de legibilidad, teclado y presentación de tarjetas. No se reconstruyó la tienda ni se implementaron funciones comerciales nuevas.

## Las ocho actividades

| Actividad | Trabajo realizado |
| --- | --- |
| 1. Identidad visual | Se conservaron el nombre, el logotipo con control, la tipografía del sistema, los fondos oscuros y los acentos violetas y azules. Se mejoró el contraste de textos secundarios del footer |
| 2. Presentación | Se mantuvieron Tailwind CSS y Button de shadcn/ui. Se ampliaron los filtros a un mínimo de 44 px de altura y se conservaron carga, error, actualización y estados vacíos |
| 3. Tarjetas | Se compararon nombre, descripción, categoría y precio de las nueve tarjetas con la API. Se mantuvo object-contain y la zona cuadrada; se añadieron dimensiones y decodificación asíncrona a las imágenes y ajuste de palabras largas |
| 4. Filtrado | Se probaron Todas y las tres categorías obtenidas desde Django. Cada categoría mostró sus tres productos sin recarga; se comprobó también una categoría sin productos mediante una respuesta controlada |
| 5. Responsive | Se verificaron 320, 390, 768, 1024 y 1440 px sin desbordamientos. Se revisó el teclado y se agregó Saltar al catálogo con foco visible |
| 6. REST | Se comprobaron ambos endpoints reales, sus JSON y la actualización de las dos consultas al pulsar Actualizar catálogo. No se utilizan productos simulados como respaldo |
| 7. Organización | Se revisaron componentes, páginas, servicios, modelos, serializadores y rutas. La separación existente era adecuada, por lo que no se hicieron movimientos innecesarios |
| 8. Funciones futuras | Se identificaron las funciones de comercio electrónico que faltarían y se documentaron al final. No se implementaron |

## Ajustes y archivos afectados

| Archivo | Ajuste |
| --- | --- |
| frontend/src/components/Header.jsx | Enlace Saltar al catálogo, visible al recibir foco con teclado |
| frontend/src/components/CategoryFilter.jsx | Altura táctil mínima de 44 px y aria-controls hacia los resultados |
| frontend/src/components/ProductCard.jsx | Textos largos ajustables, ancho mínimo flexible, imagen con dimensiones declaradas y decoding async; se conserva el respaldo local |
| frontend/src/components/Footer.jsx | Textos secundarios más claros |
| frontend/src/pages/Home.jsx | Destino del enlace de salto enfocable, aria-busy en resultados, contador más legible y mensajes de carga diferenciados |
| frontend/src/index.css | Enlaces de navegación de 44 px de alto, foco del catálogo y contraste del footer |
| README.md | Enlace al documento del Ejercicio 06 |
| docs/EJERCICIO_06.md | Actividades, pruebas, limitaciones y evidencias |

El contraste calculado del texto secundario del footer sobre negro es **8.19:1**. El texto blanco del botón violeta tiene **5.70:1**. Son comprobaciones de esos pares de colores, no una certificación de accesibilidad de toda la página.

## Organización revisada

```text
frontend/src/
├── App.jsx                 # Estado, consultas y filtrado
├── components/             # Header, ProductCard, ProductList, CategoryFilter, Footer
│   └── ui/                 # Componentes de shadcn/ui
├── pages/Home.jsx          # Composición de la página
└── services/api.js         # Solicitudes HTTP
backend/
├── catalogo/
│   ├── models.py           # Categoria y Producto
│   ├── serializers.py      # Datos JSON
│   ├── views.py            # Listados de solo lectura
│   ├── urls.py             # Rutas del catálogo
│   ├── admin.py            # Administración
│   └── migrations/         # Estructura de SQLite
└── config/                 # Configuración y rutas generales
```

Se conservaron Header, ProductCard, ProductList y CategoryFilter, props, eventos, useState y useEffect. No se modificaron el backend, sus dependencias, modelos o migraciones. Tampoco se modificó el servicio HTTP del Ejercicio 05 ni los documentos anteriores. `data/products.js` permanece como archivo histórico, sin importarse para llenar el catálogo.

## Verificaciones y resultados reales

Se utilizó la SQLite existente, que contenía **tres categorías y nueve productos**. Las comprobaciones no requirieron modificar los registros. Se compararon los JSON de productos y categorías antes y después: quedaron iguales.

| Verificación | Resultado | Observación |
| --- | --- | --- |
| npm run build | Aprobado | Compilación final generada |
| npm run lint | Aprobado | Sin avisos |
| python manage.py check | Aprobado | Sin problemas, 0 silenciados |
| python manage.py test catalogo | Aprobado | 15 pruebas ejecutadas, incluidas las de CORS |
| Ambos servidores disponibles | Aprobado | Vite en 127.0.0.1:5173 y Django en 127.0.0.1:8000 |
| GET /api/productos/ | Aprobado | HTTP 200 JSON, nueve productos reales |
| GET /api/categorias/ | Aprobado | HTTP 200 JSON, tres categorías reales |
| Contenido de tarjetas | Aprobado | Nombre, descripción, categoría, precio formateado en soles y texto alternativo coinciden con la API |
| Imágenes | Parcial | Hero y respaldo local cargan; las nueve URL externas se sustituyen por el respaldo en este Chromium |
| Proporción de imágenes | Aprobado | Zona cuadrada uniforme y object-contain, sin recortes de la antigua lámina |
| Todas y categorías | Aprobado | Nueve productos en Todas; tres en cada categoría, por id |
| Sin recarga al filtrar | Aprobado | Un marcador en window permaneció igual al cambiar la selección |
| Actualizar catálogo | Aprobado | Se registraron nuevas respuestas 200 de productos y categorías desde Django |
| Categoría sin productos | Aprobado | Mensaje comprobado mediante una categoría adicional en una respuesta controlada |
| Catálogo vacío | Aprobado | Mensaje visible y cero tarjetas; sin carga de datos simulados |
| Error HTTP y de red | Aprobado | Se mostró el error ante HTTP 503 y fallo de red controlados |
| Carga y reintento | Aprobado | Mensaje y aria-busy durante una demora controlada; recuperación posterior con API real |
| Responsive | Aprobado | 320, 390, 768, 1024 y 1440 px, sin desbordamiento horizontal |
| Textos largos | Aprobado | Nombre, descripción y categoría extensos en una respuesta de prueba, sin desbordamiento a 320 px |
| Teclado | Aprobado | Tab alcanza Saltar al catálogo; Enter enfoca la sección; el siguiente Tab alcanza Actualizar catálogo |
| Foco visible | Aprobado | Contorno del enlace y destino comprobados en Chromium |
| Tamaño de filtros | Aprobado | Altura mínima de 44 px en los cinco tamaños revisados |
| Consola JavaScript | Aprobado | Sin errores de ejecución de la aplicación |
| Datos conservados | Aprobado | JSON original de ambas entidades idéntico al terminar |

### Pruebas reales y controladas

Las tarjetas, filtros, consultas HTTP y actualización se probaron contra Django y SQLite reales. Para generar errores, carga lenta, catálogo vacío, categoría vacía y textos largos, se interceptaron respuestas únicamente en el navegador de prueba con Playwright. No se agregaron categorías artificiales ni se borraron productos en la base de datos. Se retiraron las interceptaciones y se verificó la recuperación del catálogo real.

### Limitaciones

- En este entorno las URL de imágenes externas de GitHub no se muestran en Chromium; en la comprobación previa se identificó `ERR_CERT_AUTHORITY_INVALID`. En esta revisión se observó que las nueve tarjetas utilizan el respaldo local. No se desactivó TLS ni se cambiaron los datos para ocultarlo. Verifica las URL desde tu equipo y usa recursos con certificados válidos.
- Se probaron Linux y Chromium. Windows 11, Firefox, Safari, lectores de pantalla y dispositivos físicos no se probaron.
- Las revisiones de contraste y teclado son puntuales; no sustituyen una auditoría completa de accesibilidad.
- Una base de datos nueva queda vacía hasta ingresar datos desde Django Admin, como indica el Ejercicio 04. No se distribuye db.sqlite3 por Git.

## Ejecutar en Windows 11 con PowerShell

Abre GameZone-Store en VS Code y usa dos terminales **en tu computadora**. Si los comandos se ejecutan solo en Codex, localhost de tu navegador personal no apunta a ese servidor.

### Terminal 1: backend

Desde la raíz:

```powershell
cd .\backend
# Solo si el entorno virtual no existe:
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py test catalogo
python manage.py runserver 127.0.0.1:8000
```

Si PowerShell bloquea la activación, utiliza `.\.venv\Scripts\python.exe` en lugar de `python`. Si necesitas ingresar datos, crea tu propio administrador con `python manage.py createsuperuser` antes de iniciar el servidor y sigue EJERCICIO_04.md.

### Terminal 2: frontend

Desde la raíz:

```powershell
cd .\frontend
npm ci
npm run build
npm run lint
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abre `http://127.0.0.1:5173/` y deja las dos terminales abiertas. La dirección predeterminada de la API es `http://127.0.0.1:8000/api`. Si necesitas personalizarla, revisa frontend/.env.example y configura tu propio .env.local sin sobrescribir uno existente; reinicia Vite después.

Si aparece conexión rechazada, confirma que la terminal de Vite muestra ready y que Django sigue iniciado. Si aparece el mensaje de error dentro de la tienda, revisa la API y su configuración. Si aparece catálogo vacío, registra productos en Admin; no es lo mismo que una conexión fallida. CORS permanece limitado a localhost:5173 y 127.0.0.1:5173 sobre /api/.

## Capturas sugeridas para el informe

| Evidencia | Qué capturar | Descripción sencilla |
| --- | --- | --- |
| Identidad visual | Encabezado, hero y footer | Conservé la identidad gaming y mejoré la legibilidad de los textos |
| Tarjetas | Una tarjeta y ProductCard.jsx | Verifiqué los datos del producto, el precio en soles y la presentación uniforme de la imagen |
| Filtros | Todas y luego una categoría con su botón seleccionado | Comprobé que los filtros muestran los productos correspondientes sin recargar |
| Responsive | Catálogo en móvil, tablet y computadora | Revisé que la tienda se adapte sin desbordamientos |
| Teclado | Pulsar Tab al entrar y capturar Saltar al catálogo; luego el destino enfocado | Mejoré el acceso al catálogo mediante teclado |
| REST real | F12 → Red/Network, pulsar Actualizar catálogo y mostrar productos y categorías con 200 y su JSON | Comprobé que la aplicación consulta datos reales de Django |
| Estados | Carga, error con Django detenido y recuperación al reiniciarlo y reintentar | Verifiqué los mensajes y la recuperación de la consulta |
| Organización | Explorador con components, pages, services y catalogo | Revisé la separación de responsabilidades del proyecto |
| Pruebas | Terminal con build, lint, check y 15 pruebas aprobadas | Comprobé que la aplicación compila y pasa las pruebas disponibles |
| Mejoras futuras | Tabla de la siguiente sección | Identifiqué qué falta para convertir el catálogo en una tienda completa |

Oculta contraseñas, cookies y datos privados. No presentes una imagen de respaldo como una foto del producto. Para una captura del estado vacío usa una base de pruebas separada o una respuesta controlada; no borres tus productos solo para tomar la evidencia.

## Funcionalidades futuras: solo planificación

| Funcionalidad | Para qué serviría | Consideración principal |
| --- | --- | --- |
| Carrito | Reunir productos y cantidades antes de comprar | Recalcular precios y disponibilidad desde el backend |
| Registro e inicio de sesión de clientes | Asociar compras y datos de contacto con cada usuario | Proteger contraseñas, permisos y sesiones |
| Pedidos | Guardar el detalle y estado de cada compra | Conservar los precios de la compra e impedir duplicados |
| Pagos | Cobrar mediante un proveedor autorizado | Verificar pagos en el servidor y no almacenar datos de tarjeta |
| Stock al comprar | Descontar o reservar unidades disponibles | Usar operaciones atómicas para evitar vender más unidades de las existentes |
| Envíos | Registrar direcciones, costos y seguimiento | Proteger los datos personales y definir zonas de entrega |
| Seguridad y producción | Publicar la tienda de forma segura y estable | DEBUG=False, HTTPS, secretos fuera de Git, permisos, CORS/hosts configurados, base de datos adecuada, copias de seguridad y monitoreo |

Estas funciones **no se implementaron**. El proyecto sigue siendo un catálogo académico con API pública de solo lectura y administración mediante Django Admin.
