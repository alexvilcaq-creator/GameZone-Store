# Rediseño visual de GameZone Store

## Referencias y propuesta

La primera referencia aportó la idea de un encabezado negro, un catálogo compacto y un footer dividido en columnas. De la segunda se tomó la presencia de un setup gaming en el hero y el contraste de acentos luminosos. La composición final es propia: usa negro y azul muy oscuro, violeta y azul, tarjetas alineadas y una bienvenida con el título solicitado.

## Cambios principales

- Header: logotipo con control, navegación Inicio/Productos/Categorías/Ofertas y búsqueda visual identificada como próximamente. El campo está deshabilitado porque todavía no existe búsqueda.
- Home: hero con setup, degradado oscuro, título y subtítulo solicitados, y enlace al catálogo. Incluye Productos destacados y una sección de selección con precios referenciales, sin inventar descuentos.
- ProductCard: zona de imagen cuadrada, categoría superpuesta, nombre, descripción y precio en soles. Bordes suaves, hover y alturas equilibradas.
- ProductList: cuadrícula adaptable de una a cinco columnas.
- CategoryFilter: botones de shadcn/ui con iconos y estado seleccionado mediante aria-pressed. Se conserva useState en App y el filtrado sin recarga.
- Footer: nombre de la tienda y secciones Tienda, Información y Contacto. No se inventan datos de contacto ni formularios operativos.
- index.css: colores, tipografía del sistema, contenedor, foco visible y reducción de movimiento.

## Procedencia de las imágenes

Las descargas desde Unsplash y Pexels fueron rechazadas por la política de red del entorno (HTTP 403). Se crearon recursos originales con generación de imágenes, con apariencia fotográfica y sin marcas comerciales. **Son imágenes generadas, no fotografías de productos reales ni fotos con una licencia de stock atribuida.** Se utilizan para representar los nueve productos ficticios del catálogo académico; no deben presentarse como evidencia de características de un producto comercial real.

- `frontend/public/images/gaming-setup.png`: setup gaming para el hero.
- `frontend/public/images/gaming-products.png`: lámina de nueve tomas distintas, una por producto. Primera fila: videojuegos de espacio, carreras y fantasía. Segunda: control negro inalámbrico, control blanco/violeta y control azul compacto. Tercera: teclado RGB, mouse y audífonos con micrófono.

Cada producto guarda `posicionImagen` con su fila y columna. ProductCard muestra solo esa toma mediante un contenedor cuadrado y desplazamiento CSS de la imagen. Así se conserva una sola descarga compartida para nueve fotos diferentes. No se necesitan conexiones externas para mostrar los recursos. Los SVG anteriores permanecen disponibles pero el catálogo ya no los utiliza.

## Verificación

- `npm run build`: correcto.
- `npm run lint`: correcto y sin avisos en la ejecución final.
- Chromium con Playwright: nueve productos en Todas y tres productos correctos en cada categoría; regreso a Todas sin recargar.
- Estado de los filtros: aria-pressed se actualiza correctamente.
- Imágenes: hero y todas las tarjetas cargan con dimensiones naturales válidas. Se verificaron nueve posiciones diferentes en la lámina y se inspeccionaron capturas.
- Responsive: 360 y 390 px (una columna), 768 px (tres columnas), 1440 px (cinco columnas), sin desbordamiento horizontal.
- Botón Explorar productos: navega a #productos.
- Consola: sin errores JavaScript de la aplicación.

Las pruebas se ejecutaron en Linux con Chromium; no se verificaron otros navegadores o Windows. Para revisar localmente: desde frontend ejecutar `npm ci`, `npm run dev`, `npm run build` y `npm run lint`.

## Alcance

Se conserva la lógica de App, props, eventos y productos simulados. No se cambian Django, la API, Vite ni los documentos de los Ejercicios 01, 02 y 03. No se agregan carrito, compras, cuentas, pagos, pedidos ni los ejercicios siguientes.
