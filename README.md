# PrecioCrea ✨

Calculadora de precios para emprendedoras creativas. Ayuda a determinar el precio justo de productos artesanales usando los **4 pilares del precio profesional**.

## ¿Qué hace?

Guía paso a paso para calcular el precio de cualquier producto creativo considerando:

1. **Materiales** — costo de insumos y packaging
2. **Tiempo** — valor de la mano de obra (horas × valor hora)
3. **Creatividad** — carga mental y diseño (5% a 40% adicional)
4. **Costos fijos** — gastos estructurales del negocio prorrateados por unidad

Entrega un **precio mínimo** (punto de equilibrio) y un **precio ideal** con márgenes de 30%, 50%, 80% o 120%. Muestra ambos precios con y sin IVA (19%).

## Características

- Aplicación web de una sola página (SPA), sin dependencias externas
- PWA instalable como app nativa en iOS y Android
- Funciona offline (Service Worker con caché)
- Guarda productos en `localStorage` del dispositivo
- Exporta e importa datos en JSON como respaldo
- Guía de ayuda integrada con ejemplos y fundamentos teóricos
- Interfaz mobile-first, diseño responsivo
- Idioma: español (Chile)

## Cómo usar

Abre `index.html` directamente en el navegador — no requiere servidor ni instalación.

Para compartir o publicar: sube todo el proyecto a cualquier hosting estático (GitHub Pages, Netlify, etc.). Allí funciona como PWA instalable.

## Distribución portable (archivo único)

Para casos en que no se puede usar el link (enviar por WhatsApp/Drive/email), se puede generar un único `preciocrea-portable.html` con CSS, JS e ícono embebidos:

```bash
node scripts/build-portable.js
```

El archivo `preciocrea-portable.html` (~120 KB) queda en la raíz. Se abre con doble click en cualquier navegador moderno. **Limitación:** no funciona como PWA instalable (los Service Workers requieren HTTPS), pero la app funciona normal y `localStorage` persiste los productos.

## Estructura del proyecto

```
preciocrea/
├── index.html                    ← Aplicación principal
├── manifest.webmanifest          ← Manifest PWA
├── sw.js                         ← Service Worker (bump VERSION al publicar)
├── css/
│   └── styles.css                ← Todos los estilos
├── js/
│   └── app.js                    ← Toda la lógica
├── assets/
│   ├── icons/
│   │   └── icon-192.png          ← Ícono PWA
│   ├── audio/
│   │   ├── podcast_preciocrea.mp3
│   │   └── Cobra lo que realmente vale tu trabajo.mp3
│   └── docs/
│       ├── guia_operativa.pptx
│       ├── lanzamiento_emocional.pptx
│       ├── propuesta_de_valor.pdf
│       └── propuesta_de_valor.docx
├── docs/
│   └── QA_CHECKLIST.md           ← Pruebas manuales pre-release
├── slides/
│   ├── guia_operativa/           ← Diapositivas PNG de la guía
│   └── lanzamiento_emocional/    ← Diapositivas PNG del lanzamiento
└── _archivo/                     ← Versiones anteriores (no publicar)
```

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Interfaz | HTML5, CSS3 con variables custom |
| Lógica | JavaScript vanilla (sin frameworks) |
| Persistencia | localStorage API |
| Offline | Service Worker + Cache API |
| Instalación | Web App Manifest (PWA) |
| Tipografías | Google Fonts (Fraunces + Nunito) |

## Constantes configurables

En `js/app.js` se pueden ajustar sin tocar el resto del código:

```javascript
const IVA     = 0.19;          // Tasa de IVA aplicable
const MARGINS = [30, 50, 80, 120]; // Opciones de margen de ganancia (%)
const CR_MULT = { facil:0.05, moderado:0.15, intenso:0.25, obra:0.40 };
```

## Créditos

Creada por [viviLoaiza.cl](https://viviloaiza.cl) para emprendedoras que necesitan herramientas para cobrar lo que realmente vale su trabajo.

**Queda prohibida su venta o distribución comercial.**
