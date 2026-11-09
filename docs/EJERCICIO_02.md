# Ejercicio 02: preparación y organización del proyecto

## Actividades realizadas

| Actividad | Resultado |
| --- | --- |
| 1. Carpeta principal | Se conservó el repositorio GameZone-Store existente |
| 2. Separación | Se crearon frontend y backend |
| 3. ReactJS | Se creó el proyecto con Vite y JavaScript; package.json incluye los comandos npm |
| 4. Tailwind CSS | Se configuró Tailwind 4 mediante su plugin de Vite y el archivo index.css |
| 5. shadcn/ui | Se incorporó Button, sus dependencias, components.json y el alias @ |
| 6. Django | Se creó config, se agregó rest_framework a INSTALLED_APPS y se mantuvo SQLite; requirements.txt fija las dependencias |
| 7. Organización | Se crearon components, pages y services; las últimas dos conservan .gitkeep |
| 8. Verificación | Se ejecutaron compilación, revisión estática, comprobación de Django y ambos servidores |

## Resultados reales en Codex

Las comprobaciones se ejecutaron en Linux con Node.js 24.22.1 y Python 3.12.14.

| Verificación | Resultado |
| --- | --- |
| Instalación npm | Completada |
| Instalación Python en .venv | Completada |
| npm run build | Correcto, generó dist |
| npm run lint | Correcto, sin avisos en la comprobación final |
| python manage.py check | Sin problemas, 0 silenciados |
| python manage.py migrate | Migraciones iniciales aplicadas a SQLite |
| npm run dev | Vite inició correctamente; petición HTTP a la página inicial correcta |
| python manage.py runserver | Django inició correctamente; petición HTTP a la página inicial correcta |
| Navegador Chromium con Playwright | Se mostró GameZone Store, se pulsó el botón y cambió el mensaje sin errores JavaScript |
| Estilos Tailwind y shadcn/ui | Se comprobó en el navegador que el botón tiene fondo violeta y altura de 36 px |

La primera comprobación de color se realizó durante el efecto hover del botón y detectó el color de transición. Se repitió comprobando el estilo antes de pulsarlo y pasó. Esto no requirió cambiar los estilos.

No se ejecutó en Windows 11. En la computadora del estudiante falta repetir la instalación y los comandos de PowerShell del README y abrir ambas páginas. No se implementaron pruebas de catálogo, porque ese desarrollo queda fuera del Ejercicio 02.

## Capturas sugeridas para el informe

| Evidencia | Qué capturar | Descripción sencilla |
| --- | --- | --- |
| Organización | Explorador del editor con frontend, backend, docs y las carpetas components, pages y services | Organicé el proyecto para separar la interfaz y el servidor |
| React y Vite | frontend/package.json y src/main.jsx | Configuré React con JavaScript y los comandos para iniciar y compilar |
| Tailwind | frontend/vite.config.js y src/index.css | Agregué el plugin y los estilos de Tailwind para dar formato a la pantalla |
| shadcn/ui | frontend/components.json, jsconfig.json, src/components/ui/button.jsx y src/lib/utils.js | Preparé los alias y agregué un botón de shadcn/ui para comprobar la instalación |
| Pantalla inicial | src/App.jsx y navegador después de pulsar Comprobar interfaz | Mostré el nombre de la tienda y comprobé que el botón responde |
| Django y DRF | backend/requirements.txt y las secciones INSTALLED_APPS y DATABASES de config/settings.py | Instalé Django y Django REST Framework y dejé SQLite como base de datos |
| Ejecución de React | Terminal con npm run dev y otra captura con npm run build y npm run lint | Comprobé que la interfaz inicia y que se puede compilar |
| Ejecución de Django | Terminal con python manage.py check y python manage.py runserver; página inicial de Django | Comprobé que el servidor inicia sin problemas de configuración |
| Archivos ignorados | .gitignore y git status --short | Evité incluir dependencias, el entorno virtual, variables privadas y la base de datos local |

La planificación del Ejercicio 01 se conserva sin cambios. No se desarrollaron los Ejercicios 03, 04, 05 ni 06.
