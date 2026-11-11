# GameZone Store

GameZone Store es una propuesta de tienda virtual de videojuegos, controles y accesorios gaming. Este repositorio contiene el análisis y la planificación del Ejercicio 01 del Laboratorio N.º 13 de Desarrollo de Aplicaciones Empresariales de TECSUP: «Estructura de una aplicación de comercio electrónico».

## Tecnologías previstas

| Área | Tecnologías |
| --- | --- |
| Interfaz | ReactJS, Vite, Tailwind CSS y shadcn/ui |
| API del backend | Django REST Framework |
| Base de datos | SQLite |
| Administración de productos | Django Admin |

## Planificación

Consulta el [documento de análisis y planificación](docs/PLANIFICACION.md), que incluye el negocio, las funcionalidades, los datos, los componentes de interfaz y la arquitectura propuesta.

En el Ejercicio 01 solo se presentó documentación. En esa etapa no se crearon aplicaciones React o Django ni se instalaron dependencias. El alcance no incluye carrito, pedidos, autenticación de clientes ni pagos.


## Ejercicio 02: preparación y organización

Se prepararon dos proyectos separados: React con JavaScript y Vite en `frontend`, y Django con Django REST Framework y SQLite en `backend`. La pantalla inicial muestra GameZone Store y un botón de shadcn/ui para comprobar la interfaz. No se implementaron el catálogo, ProductCard ni los filtros de los ejercicios siguientes.

### Requisitos para Windows 11

- Node.js 24 LTS (o una versión compatible desde 22.12) con npm.
- Python 3.12 con el lanzador `py`.
- Git y PowerShell. Ejecutar los comandos desde la carpeta del repositorio.

Las versiones exactas del frontend se conservan en `frontend/package-lock.json`; las del backend están en `backend/requirements.txt`. Se verificaron React 19, Vite 8, Tailwind CSS 4, Django 5.2 LTS y Django REST Framework 3.18.

### Instalar y ejecutar frontend en PowerShell

```powershell
cd .\frontend
npm ci
npm run dev
```

Abrir la dirección que muestra Vite, normalmente `http://localhost:5173`. El botón **Comprobar interfaz** cambia el mensaje de estado. Para detener el servidor, presionar Ctrl+C.

Comprobaciones desde `frontend`:

```powershell
npm run build
npm run lint
```

### Instalar y ejecutar backend en otra ventana de PowerShell

Desde la raíz de GameZone-Store:

```powershell
cd .\backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py runserver
```

Abrir `http://127.0.0.1:8000` para ver la página inicial de Django. Para detenerlo, presionar Ctrl+C. SQLite se crea localmente como `backend/db.sqlite3` y no se sube a GitHub. Las migraciones aplicadas son las incluidas por Django; no hay modelos propios ni autenticación de clientes implementada.

Si PowerShell bloquea la activación del entorno, se puede usar directamente su intérprete, sin cambiar la política de ejecución:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py runserver
```

La configuración es para desarrollo local (`DEBUG=True`). No incluye credenciales. `DJANGO_SECRET_KEY` es opcional para establecer una clave local estable; si no existe, Django genera una clave temporal en cada arranque. No es una configuración para publicar en producción.

### Organización principal

```text
GameZone-Store/
├── .gitignore
├── README.md
├── docs/
│   ├── PLANIFICACION.md
│   └── EJERCICIO_02.md
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── jsconfig.json
│   ├── components.json
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/ui/button.jsx
│       ├── lib/utils.js
│       ├── pages/.gitkeep
│       └── services/.gitkeep
└── backend/
    ├── manage.py
    ├── requirements.txt
    └── config/
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        ├── asgi.py
        └── wsgi.py
```

`pages` y `services` se reservan para los próximos ejercicios. Los archivos `.gitkeep` permiten guardar esas carpetas vacías en Git.

### Configuración de Tailwind y shadcn/ui

Tailwind CSS 4 se integra con el plugin `@tailwindcss/vite` y `@import "tailwindcss"` en `src/index.css`. Esta integración no requiere `tailwind.config.js` ni configuración de PostCSS adicional. El alias `@` se configura tanto en Vite como en `jsconfig.json`.

shadcn/ui incorpora el código de sus componentes al proyecto. `components.json` establece JavaScript (`tsx: false`), los alias y el archivo CSS. El botón proviene del componente oficial de shadcn/ui, adaptado a JavaScript y al paquete individual `@radix-ui/react-slot`; sus variantes usan `class-variance-authority` y la utilidad `cn` combina `clsx` con `tailwind-merge`.

Referencias oficiales: [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite), [shadcn/ui con Vite](https://ui.shadcn.com/docs/installation/vite) y [código oficial del botón](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx). Las páginas web directas fueron bloqueadas por la red del entorno; se consultaron las instrucciones de Vite de shadcn/ui y el botón desde su repositorio oficial.

Consulta los [resultados y evidencias del Ejercicio 02](docs/EJERCICIO_02.md).


## Ejercicio 04: catálogo y servicios REST

El backend incluye la aplicación `catalogo`, los modelos Categoria y Producto, su administración y dos servicios JSON de solo lectura:

- `GET /api/categorias/`
- `GET /api/productos/`

Desde `backend`, con el entorno virtual activado, ejecutar `python manage.py migrate`, `python manage.py createsuperuser` y `python manage.py runserver`. Ingresar los datos desde `/admin/`. La base SQLite es local y no se incluye en Git.

Consulta [Ejercicio 04: instalación, datos de ejemplo, pruebas y evidencias](docs/EJERCICIO_04.md). El frontend todavía no consume estos servicios.


## Ejercicio 05: integración del catálogo

React ahora consulta productos y categorías de Django mediante `src/services/api.js`. Los filtros usan los ids recibidos, y el catálogo incluye carga, error, estados vacíos y Actualizar catálogo. Los datos simulados anteriores ya no se importan para mostrar productos.

Inicia Django en `127.0.0.1:8000` y Vite en el puerto `5173`. Puedes copiar `frontend/.env.example` a `.env.local` para configurar `VITE_API_URL`; no sobrescribas una configuración local existente. Instala las dependencias actualizadas con `python -m pip install -r requirements.txt` desde backend. CORS permite únicamente `localhost:5173` y `127.0.0.1:5173` sobre `/api/`.

Consulta [Ejercicio 05: configuración, pruebas y evidencias](docs/EJERCICIO_05.md). Una base SQLite nueva requiere ingresar los datos desde Admin. El frontend muestra un mensaje de catálogo vacío cuando no hay productos; no carga datos simulados automáticamente.
