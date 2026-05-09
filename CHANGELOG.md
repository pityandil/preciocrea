# Changelog

Historial de cambios de PrecioCrea. El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.1.0] — 2026-05-09

### Reorganización y mejora del proyecto

#### Estructura
- Separado el archivo monolítico `preciocrea.html` en tres archivos:
  - `index.html` — estructura HTML
  - `css/styles.css` — todos los estilos (~1.400 líneas de CSS)
  - `js/app.js` — toda la lógica (~620 líneas de JavaScript)
- Creadas carpetas `assets/audio/`, `assets/docs/`, `slides/` para organizar multimedia y documentos
- Archivos duplicados y versiones anteriores movidos a `_archivo/`
- PPTXs renombrados a nombres descriptivos sin sufijos de versión
- Diapositivas PNG organizadas por tema en `slides/`

#### Código
- Extraída constante `IVA = 0.19` (antes `1.19` hardcodeado en 8 lugares)
- Extraída constante `MARGINS = [30, 50, 80, 120]` (antes array literal repetido)
- Service Worker actualizado a versión `pc-v3` con caché extendido para los nuevos archivos separados
- Añadido `</body></html>` que faltaba en el HTML original
- Inicializado repositorio git con control de versiones

#### Documentación
- Creado `README.md` con descripción, estructura y guía de uso
- Creado `CHANGELOG.md` (este archivo)
- Creado `.gitignore` apropiado para el proyecto

---

## [1.0.0] — 2026-03-08

### Lanzamiento inicial

#### Aplicación
- Calculadora de precios con flujo de 4 pasos (materiales, tiempo, creatividad, costos fijos)
- Vista de resultados con precio mínimo y precio ideal
- Selector de márgenes de ganancia: 30%, 50%, 80%, 120%
- Cálculo automático de precios con y sin IVA (19%)
- Lista de productos guardados con estadísticas

#### Funcionalidades
- Guardado de productos en localStorage
- Vista de detalle/edición de productos guardados
- Eliminación de productos
- Exportación de datos a JSON (respaldo)
- Importación de respaldo JSON (merge sin duplicados)

#### Interfaz
- Diseño mobile-first con paleta coral/púrpura/amarillo
- Animaciones CSS y transiciones entre vistas
- Tooltips contextuales en cada campo del formulario
- Tarjeta link al podcast en Spotify

#### Guía integrada
- Vista de ayuda con 7 secciones expandibles
- Explicación de cada pilar del precio con ejemplos reales
- Sección de errores comunes
- Mantras para emprendedoras

#### PWA
- Service Worker para funcionamiento offline
- Web App Manifest para instalación como app nativa
- Ícono embebido en base64
