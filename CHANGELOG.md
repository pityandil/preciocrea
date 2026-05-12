# Changelog

Historial de cambios de PrecioCrea. El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [1.3.0] — 2026-05-12

### Instalación con un toque

- Botón "Instalar en tu teléfono" en el home, visible solo cuando aplica (oculto si la app ya está instalada en modo standalone).
- En Android/desktop Chrome usa el evento `beforeinstallprompt` para abrir el diálogo nativo de instalación con un toque.
- En iOS (donde Apple no expone esa API) abre una guía visual con los 3 pasos de Safari: Compartir → Agregar a inicio → Agregar. Incluye tip para usuarias de Chrome en iPhone (deben usar Safari).
- Toast "🎉 ¡App instalada!" al detectar el evento `appinstalled`.
- Bump `VERSION` a 1.3.0 en `sw.js` para que las instalaciones previas vean el banner "Hay una nueva versión disponible".

---

## [1.2.0] — 2026-05-12

### Calidad y seguridad para las usuarias

#### Correcciones
- **Crítico:** corregido un doble `<script>` que impedía la carga de `js/app.js` en navegadores estrictos. Agregado `<body>` de apertura que faltaba.
- `esc()` ahora también escapa comillas dobles y simples y maneja `null`/`undefined`.

#### Seguridad de datos
- Validación y sanitización del archivo importado: límite de 1 MB, reconstrucción de cada producto desde cero (rechaza campos desconocidos, valida tipos, longitudes y rangos).
- Mensajes diferenciados para archivo grande, sin productos, ningún producto válido y productos ya existentes.
- Nuevo helper `persistProducts()` con aviso claro cuando `localStorage` falla (cuota llena, Safari modo privado) — reemplaza los `try/catch` mudos en `saveProduct`, `delProduct`, `saveDetProduct` e `importData`.
- Modal de confirmación reutilizable antes de eliminar productos, con cierre por ESC/backdrop y foco en "Cancelar" por defecto.

#### PWA
- `sw.js` y `manifest.webmanifest` como archivos reales (antes se generaban inline con `Blob`/`URL.createObjectURL`).
- Service Worker con `VERSION` explícita, limpieza de caches antiguos en `activate` y soporte para `SKIP_WAITING`.
- Ícono PNG real en `assets/icons/icon-192.png` (decodificado desde el data URI embebido).
- Banner "Hay una nueva versión disponible — Recargar" cuando el SW detecta un update.

#### Endurecimiento
- Meta `Content-Security-Policy` restrictiva en `index.html` (default `'self'`, manifest/worker mismo origen, object/frame externos bloqueados, Google Fonts permitido).
- `maxlength` en inputs de texto (100/60 chars), `max` en inputs numéricos (100M/9999h/100k unidades) e `inputmode` para teclado numérico móvil.
- `sanitizeNum()` capea con `Math.min(n, MAX_INPUT_NUM)` además de rechazar `NaN`/`Infinity`/negativos.

#### UX de confianza
- Banner de recordatorio inteligente: cuenta productos sin respaldar y días desde el último backup; estado "urgente" amarillo si pasaron 7+ días o hay 3+ productos nuevos.
- Banner de onboarding descartable la primera vez con CTA "Probar con ejemplo" (jabón de lavanda pre-rellenado).
- Toggle "Mostrar precios con IVA" persistente en la vista de respaldo.
- Botón "📱 WhatsApp" en el detalle del producto: abre `wa.me` con mensaje pre-armado (nombre, precio, c/IVA si está activo).
- Botón "📋 Duplicar" en el detalle: crea una copia para variantes del producto.

#### Documentación
- `docs/QA_CHECKLIST.md` con escenarios manuales a pasar antes de cada release (smoke test, onboarding, backup/restore, robustez, validaciones, compartir, IVA, PWA, seguridad, layout).

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
