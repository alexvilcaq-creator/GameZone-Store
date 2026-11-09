# Ejercicio 03: componentes principales en ReactJS

## Actividades desarrolladas

| Actividad | Archivo y explicación |
| --- | --- |
| 1. Encabezado | `frontend/src/components/Header.jsx` muestra GameZone Store, un icono de control y los enlaces Inicio, Productos y Categorías. En celulares organiza el contenido en dos filas |
| 2. Tarjeta de producto | `frontend/src/components/ProductCard.jsx` muestra imagen, nombre, descripción, precio en soles y categoría |
| 3. Datos mediante props | ProductCard recibe nombre, descripcion, precio, imagen y categoria. No contiene productos escritos dentro del componente. Intl.NumberFormat presenta los precios en soles |
| 4. Lista reutilizable | `frontend/src/components/ProductList.jsx` recibe products, recorre el arreglo con .map() y utiliza product.id como key única |
| 5. Filtros | `frontend/src/components/CategoryFilter.jsx` ofrece Todas, Videojuegos, Controles y Periféricos mediante Button de shadcn/ui |
| 6. Eventos y estado | `frontend/src/App.jsx` guarda selectedCategory con useState. Los botones llaman a onCategoryChange mediante onClick |
| 7. Comunicación | App filtra los productos y entrega el resultado a Home. Home pasa la lista a ProductList y el estado y la función a CategoryFilter. React actualiza las tarjetas sin recargar la página. ProductList muestra un mensaje si recibe un arreglo vacío |
| 8. Presentación | `frontend/src/pages/Home.jsx` organiza bienvenida, filtros y catálogo. Tailwind y el botón existente de shadcn/ui permiten una presentación oscura con detalles azules y violetas, adaptable a varias pantallas |

## Datos y recursos

`frontend/src/data/products.js` contiene nueve productos simulados: tres videojuegos, tres controles y tres periféricos. Cada uno tiene id, nombre, descripcion, precio, imagen y categoria. Los precios son referenciales en soles peruanos.

Las nueve ilustraciones SVG de `frontend/public/images/` son recursos locales creados para esta demostración. No dependen de servicios externos ni representan fotografías de productos comerciales. La configuración de Vite se conserva.

## Flujo de información

```text
App: estado de categoría y productos filtrados
└── Home
    ├── CategoryFilter: recibe categoría y función de cambio
    └── ProductList: recibe productos filtrados
        └── ProductCard: recibe los datos de cada producto
```

## Verificaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| npm run build | Correcto |
| npm run lint | Correcto, sin avisos |
| Renderizado en Chromium con Playwright | Encabezado, bienvenida, filtros y nueve tarjetas visibles |
| Cambio de categorías | Cada categoría mostró tres productos correctos; Todas restauró los nueve |
| Actualización sin recarga | Se conservó un marcador temporal en window al cambiar los filtros |
| Estado accesible | El botón elegido actualizó aria-pressed |
| Imágenes | Las nueve imágenes locales cargaron correctamente |
| Adaptación | A 375, 768 y 1440 px se mostraron una, dos y tres columnas, sin desbordamiento horizontal |
| Lista vacía | Se montó ProductList con un arreglo vacío y apareció su mensaje. No se agregó una categoría artificial al catálogo |
| Consola | Sin errores de ejecución de la aplicación |

La primera prueba aislada de lista vacía falló por la forma de importar ReactDOM desde el script de comprobación. Se corrigió el script externo y la prueba pasó; no fue necesario cambiar el componente.

Las pruebas se ejecutaron en Linux con Chromium. No se probaron Windows ni otros navegadores. Para revisar localmente, ejecutar `npm ci` y `npm run dev` desde frontend, abrir la dirección indicada y cambiar los filtros. Se mantiene el procedimiento de instalación del README.

## Evidencias para el informe

| Captura sugerida | Descripción sencilla |
| --- | --- |
| Explorador del editor con components, data y pages | Organicé los componentes y separé los datos del catálogo |
| Header.jsx y encabezado en el navegador | Creé el nombre de la tienda, su logotipo y el menú adaptable |
| ProductCard.jsx y una tarjeta | Usé props para mostrar los datos y el precio de cada producto |
| ProductList.jsx | Recorrí los productos con map y asigné una key única a cada tarjeta |
| CategoryFilter.jsx | Agregué botones que avisan al componente principal cuando cambia la categoría |
| App.jsx | Guardé la categoría con useState y filtré los productos antes de mostrarlos |
| products.js y la carpeta public/images | Preparé nueve productos de ejemplo con imágenes locales y precios en soles |
| Home.jsx e index.css | Organicé la pantalla y apliqué Tailwind con colores oscuros, azules y violetas |
| Navegador en Todas y luego en Controles | Comprobé que el catálogo cambia de nueve a tres productos sin recargar |
| Navegador a 375, 768 y 1440 px | Comprobé que las tarjetas se adaptan a celular, tablet y computadora |
| Terminal con build y lint | Verifiqué que el frontend compila y pasa la revisión del código |

## Alcance conservado

No se modificaron Django, la configuración de Vite, PLANIFICACION.md ni EJERCICIO_02.md. No hay conexión a la API ni base de datos, carrito, pagos, pedidos o autenticación. No se desarrollaron los Ejercicios 04, 05 ni 06.
