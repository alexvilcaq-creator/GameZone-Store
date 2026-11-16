# GameZone Store: mejora visual y experiencia premium

## Punto de partida y conservación del trabajo

Se revisó main y se comprobó que inventario, búsqueda, descuentos y recomendaciones todavía pertenecían a `feat/inventario-busqueda-promociones`. La rama `style/gamezone-experiencia-premium` parte de ese trabajo, que ya contiene el main observado. **El PR hacia main incluye esa dependencia si aún no se ha fusionado.** No se omitieron sus modelos, migración ni pruebas. Las eliminaciones previas de documentos realizadas en main no se revirtieron.

El backend, sus permisos, dependencias y los registros de SQLite no se modificaron en este rediseño. Se mantuvieron categorías, nombres, precios, stock, descuentos, actualización manual y las consultas REST reales.

## Problemas observados antes de editar

- Las nueve imágenes externas fallaban en Chromium y aparecía el mismo respaldo en todas las tarjetas.
- El hero era demasiado alto en celulares y retrasaba el acceso al catálogo.
- Las tarjetas móviles utilizaban una sola columna, con imágenes grandes y mucho desplazamiento.
- Recomendaciones repetía tarjetas completas del catálogo, haciendo la página extensa.
- La búsqueda y las acciones de actualización no tenían una jerarquía visual clara.

Se capturó la aplicación original antes de cambiar archivos. Los servidores ya estaban ejecutándose; al intentar arrancar procesos adicionales, los puertos figuraron ocupados, por lo que se reutilizaron los servidores existentes después de comprobar sus respuestas.

## Dirección visual y mejoras

La identidad conserva negro y azul muy oscuro con violeta moderado, tipografía del sistema, icono de control y nombre GameZone Store. No se añadieron marcas, cifras comerciales o beneficios de venta inexistentes.

| Área | Resultado |
| --- | --- |
| Header | Marca simplificada, navegación siempre visible y búsqueda funcional con foco claro y limpieza accesible |
| Móvil | Búsqueda de ancho completo, enlaces de navegación visibles sin menú oculto y cuadrícula de dos columnas |
| Hero | Composición editorial con setup, degradado legible, dos llamadas a navegación reales y altura menor en celular |
| Catálogo | Filtros consistentes, contador de resultados, consulta visible y limpieza contextual de filtros |
| Tarjetas | Imágenes cuadradas uniformes, categoría, nombre, descripción, precio y stock alineados; descuento y precio anterior cuando existen |
| Ofertas | Se muestran solo las promociones calculadas por Django, sin inventar descuentos o urgencia |
| Recomendaciones | Se conservan las reglas de categoría, stock y descuento; formato horizontal compacto para reducir repetición |
| Estados | Skeleton durante carga, error identificable, reintento y mensajes distintos de vacío; sin datos simulados silenciosos |
| Accesibilidad | Enlace Saltar al catálogo, foco visible, limpieza de búsqueda que devuelve foco al campo, teclado y movimiento reducido |
| Footer | Información real del proyecto, navegación, contacto pendiente identificado y sin formularios ficticios |

No se agregaron botones de comprar, favoritos, carrito o acciones sin implementar. No se agregaron pagos, pedidos o cuentas de clientes.

## Imágenes: diagnóstico, solución y procedencia

Se volvió a comprobar una de las URL originales de GitHub en Chromium y produjo `net::ERR_CERT_AUTHORITY_INVALID`. La imagen original no pudo cargarse en ese navegador del entorno; no se desactivó TLS ni se usó ignoreHTTPSErrors.

El repositorio ya contenía dos imágenes originales generadas en el rediseño anterior:

- `frontend/public/images/gaming-setup.png`: setup del hero.
- `frontend/public/images/gaming-products.png`: lámina de nueve tomas para los productos ficticios, sin marcas comerciales.

**Son imágenes generadas con apariencia fotográfica, no fotografías reales de productos ni recursos de stock a los que se atribuya una licencia externa.** Se reutilizaron sus archivos originales sin crear nuevas imágenes ni descargar fotografías de terceros. Los productos de demostración son ficticios y sus imágenes no deben interpretarse como evidencia de especificaciones de artículos comerciales reales.

`resolverImagen` reconoce exclusivamente las URL HTTPS originales de `raw.githubusercontent.com/alexvilcaq-creator/GameZone-Store/<ref>/frontend/public/images/<archivo>.svg` para estos nueve nombres conocidos:

| Archivo original | Toma local correspondiente |
| --- | --- |
| game-space.svg | Juego espacial |
| game-race.svg | Juego de carreras |
| game-kingdom.svg | Juego de fantasía |
| control-wireless.svg | Control negro inalámbrico |
| control-pro.svg | Control blanco/violeta |
| control-compact.svg | Control azul compacto |
| keyboard.svg | Teclado RGB |
| mouse.svg | Mouse gaming |
| headset.svg | Audífonos con micrófono |

Para esas ilustraciones de demostración, el frontend utiliza la toma correspondiente de la lámina local mediante CSS. Hay nueve posiciones distintas y una sola descarga de imagen compartida. **No se cambió imagen_url ni ningún otro campo de SQLite.** Esta es una correspondencia explícita entre recursos del propio catálogo, no un reemplazo arbitrario por el nombre o categoría del producto.

Las URL personalizadas, las rutas locales y los recursos de otros repositorios se conservan; no se sustituyen por la lámina. Para volver a la presentación original de las nueve ilustraciones se puede retirar esta correspondencia en `lib/imagenes.js`, sin modificar datos. Si una imagen desconocida o un recurso local falla, ProductImage usa el respaldo una sola vez y elimina el posicionamiento de la lámina para mostrarlo completo.

La causa externa de certificados sigue existiendo para URL personalizadas que dependan de esa conexión: no se afirma haber reparado la confianza global del navegador. Los nueve productos actuales ya se ven correctamente al usar sus recursos locales.

## Organización y archivos

| Archivo | Responsabilidad |
| --- | --- |
| components/Header.jsx | Marca, navegación, búsqueda controlada y gestión del foco al limpiar |
| components/Hero.jsx | Sección de bienvenida separada de Home |
| components/CatalogStatus.jsx | Carga, skeleton y errores |
| components/ProductImage.jsx | Presentación de imagen y respaldo |
| lib/imagenes.js | Correspondencia limitada de imágenes conocidas |
| components/ProductCard.jsx | Tarjetas normales y compactas, stock y precios de Django |
| components/ProductList.jsx | Cuadrículas y mensajes vacíos |
| components/CategoryFilter.jsx | Misma selección por id con presentación coherente |
| components/Footer.jsx | Información y navegación secundaria |
| pages/Home.jsx | Composición de secciones y controles existentes |
| index.css | Identidad, superficies, tarjetas, breakpoints y reducción de movimiento |
| tests/catalogo.test.js | Pruebas existentes y tres verificaciones de imágenes |

Se conservó App y la capa de servicios; búsqueda, recomendaciones y ofertas siguen calculándose a partir de la respuesta del backend. No se agregaron dependencias a package.json ni requirements.txt. Se usó un formateador temporal de desarrollo para ordenar el código, sin incorporarlo como dependencia del proyecto.

## Verificaciones reales

| Comprobación | Resultado |
| --- | --- |
| npm run build | Correcto |
| npm run lint | Correcto, sin avisos |
| npm test | 7 pruebas aprobadas, incluidas búsqueda/recomendaciones y correspondencia/respaldo de imágenes |
| python manage.py check | Sin problemas |
| python manage.py test catalogo | 18 pruebas aprobadas |
| API real | Nueve productos y tres categorías desde Django; precios comparados con los de la respuesta |
| Actualizar catálogo | Nuevas respuestas 200 de ambos endpoints |
| Búsqueda | Ignora tildes, se combina con categoría y conserva el foco al escribir |
| Limpieza | Limpiar filtros restablece el catálogo; Limpiar búsqueda devuelve foco al campo |
| Categorías | Todas y cada categoría muestran la cantidad correcta sin recargar |
| Imágenes reales de la vista | Nueve recursos locales válidos, sin respaldos en el catálogo normal |
| Imagen rota controlada | Activa el respaldo local sin un ciclo de errores |
| Stock/promociones | Disponibilidad, últimas unidades, agotado, descuento y precio final se muestran correctamente; agotados excluidos de ofertas y recomendaciones |
| Carga/error/vacío | Skeleton, aria-busy, HTTP 503, error de red, categoría vacía y catálogo vacío comprobados |
| Recuperación | Reintentar volvió a consultar los datos reales |
| Teclado | Tab alcanza Saltar al catálogo, Enter enfoca la sección y permite llegar al botón de actualización |
| Responsive | 360, 390, 768, 1024 y 1440 px sin desbordamiento horizontal |
| Movimiento reducido | Hover sin desplazamiento con prefers-reduced-motion |
| Datos conservados | JSON de productos idéntico antes y después |
| Consola JS | Sin errores de ejecución de la aplicación |

Las tarjetas, consultas, búsqueda, filtros y capturas después usan API real. Para probar descuentos, agotados, imagen rota, carga, fallos y vacíos se interceptaron temporalmente respuestas en el navegador con Playwright. La captura `prueba-controlada-promocion.png` está identificada como prueba controlada; no representa descuentos configurados permanentemente. No se alteraron los registros ni se usaron datos simulados como respaldo de la aplicación.

Las capturas de 1440, 1024 y 390 px se abrieron e inspeccionaron visualmente. Se comprobaron además los otros tamaños con assertions del navegador. No se probaron Windows, Firefox, Safari, lectores de pantalla ni dispositivos físicos; las verificaciones puntuales no equivalen a una auditoría completa de accesibilidad.

## Evidencias

Carpeta: `docs/evidencias/rediseño-premium/`.

| Imagen | Descripción para el informe |
| --- | --- |
| [antes-1440.png](evidencias/rediseño-premium/antes-1440.png) | Revisé la tienda original y observé imágenes sustituidas por el respaldo y repetición de tarjetas |
| [antes-390.png](evidencias/rediseño-premium/antes-390.png) | Identifiqué un catálogo móvil demasiado largo con una sola columna |
| [despues-1440.png](evidencias/rediseño-premium/despues-1440.png) | Mejoré la jerarquía visual, las imágenes y la presentación compacta de recomendaciones |
| [despues-390.png](evidencias/rediseño-premium/despues-390.png) | Organicé el catálogo móvil en dos columnas y mantuve visibles búsqueda y navegación |
| despues-360.png, despues-768.png y despues-1024.png | Verifiqué la adaptación de la interfaz en otros tamaños sin desbordamientos |
| [prueba-controlada-promocion.png](evidencias/rediseño-premium/prueba-controlada-promocion.png) | Comprobé visualmente una respuesta de prueba con descuento, stock bajo y respaldo de imagen |

## Windows 11: instalación y ejecución

Requiere Python 3.12 y Node.js 24. Desde la raíz, primera terminal de PowerShell:

```powershell
cd backend
# Solo si .venv no existe:
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py test catalogo
python manage.py runserver 127.0.0.1:8000
```

Si PowerShell bloquea la activación, usa `.\.venv\Scripts\python.exe` en lugar de python. La migración de inventario y promociones forma parte de la rama dependiente y debe aplicarse. La SQLite local no está en Git; si está vacía, crea tu administrador con `python manage.py createsuperuser` e ingresa tus categorías y productos desde Admin, sin sustituirlos por datos simulados.

Segunda terminal desde la raíz:

```powershell
cd frontend
npm ci
npm run build
npm run lint
npm test
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abre `http://127.0.0.1:5173/` en tu computadora y mantén ambos servidores abiertos. Se conserva VITE_API_URL y el CORS local existente. No sobrescribas tu .env.local. Si trabajas solo en una terminal remota, localhost de tu navegador personal no apunta automáticamente a ese entorno.
