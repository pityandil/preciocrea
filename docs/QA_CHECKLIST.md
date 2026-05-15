# Checklist de QA manual — PrecioCrea

Pasar todos los escenarios antes de publicar una versión nueva.
Cada release debe bumpear `VERSION` en `sw.js` para invalidar el caché viejo.

## Smoke test (5 min)

- [ ] Abrir `index.html` directo en navegador local — la app renderiza sin errores en la consola.
- [ ] Crear un producto desde cero: ingresar nombre, agregar 2 materiales, llenar tiempo, elegir nivel creativo, costos fijos. El resultado muestra precios mínimo e ideal.
- [ ] El producto aparece en el home y al recargar sigue ahí.
- [ ] Abrir el producto, editar el valor de materiales, guardar. Se actualizan los precios.
- [ ] Eliminar el producto — el modal de confirmación aparece y muestra el nombre. Confirmar borra; cancelar lo conserva.

## Onboarding y primer uso

- [ ] En una pestaña incógnita (sin localStorage previo): aparece el banner "Antes de empezar".
- [ ] Hacer click en "Probar con ejemplo" prellena nombre y un material, y descarta el banner.
- [ ] "Entendido" descarta el banner sin abrir la calculadora.
- [ ] Recargar la página: el banner ya no vuelve a aparecer.

## Backup y restore

- [ ] Con productos guardados, "Descargar respaldo" genera un archivo `preciocrea-respaldo-YYYY-MM-DD.json` válido (abrirlo en un editor, debe ser JSON con `app: "PrecioCrea"` y `products: [...]`).
- [ ] Después del export, el banner de recordatorio desaparece.
- [ ] Importar el mismo archivo: muestra "Estos productos ya están guardados".
- [ ] Importar un archivo con un producto distinto: lo agrega sin duplicar los existentes.
- [ ] Importar un archivo que no es JSON (ej. un `.txt`): toast "Archivo inválido", sin crash.
- [ ] Importar un archivo `.json` mal formado (ej. `{"products": [{"name": null}]}`): los inválidos se descartan, el toast dice "Ningún producto válido" o cuenta los válidos.
- [ ] Importar un archivo > 1 MB: toast "Archivo demasiado grande".

## Robustez de datos

- [ ] En **Safari modo privado** (iOS): crear un producto. Al fallar `localStorage.setItem`, aparece un toast claro indicando que no se pudo guardar.
- [ ] Llenar localStorage manualmente hasta el tope (DevTools → Application → localStorage → llenar con strings grandes) e intentar guardar: el toast indica "Sin espacio para guardar".

## Validaciones de entrada

- [ ] Nombre del producto vacío: no permite avanzar (toast "Ponle nombre").
- [ ] Materiales sin costo positivo: no permite avanzar.
- [ ] Horas o valor hora en 0: no permite avanzar.
- [ ] Escribir un valor enorme (ej. 999999999999999): el cálculo se capea, no muestra `NaN` ni infinitos.
- [ ] Pegar caracteres no numéricos en un input numérico: el navegador los descarta o `sanitizeNum` los normaliza a 0.

## Compartir y duplicar

- [ ] Botón WhatsApp abre wa.me en pestaña nueva con el mensaje pre-armado, incluyendo nombre, precio y línea c/IVA.
- [ ] Botón "Duplicar" crea una copia con sufijo "(copia)" en el nombre y fecha de hoy. La copia es independiente de la original.

## Marca viviLoaiza

- [ ] Tarjeta de viviLoaiza en el home: muestra avatar "vL", enlaces a sitio (viviloaiza.cl) y a Instagram (@viviloaiza.cl). Ambos abren en pestaña nueva.
- [ ] Vista de Respaldo: el bloque "Sobre viviLoaiza" muestra los dos enlaces (sitio + Instagram) y reemplaza por completo el antiguo toggle de IVA.
- [ ] Vista de Ayuda: al final aparece el bloque "Sobre la creadora" con los dos enlaces antes del botón "Empezar a calcular".
- [ ] IVA siempre activado: en home, detalle, resultados y WhatsApp se ve la línea c/IVA sin opción de ocultarla.

## PWA

- [ ] Servir la app por HTTPS (ej. Netlify, GitHub Pages) e instalar como PWA en Android Chrome: aparece el ícono en el cajón de apps.
- [ ] Instalar en iOS Safari ("Compartir → Agregar a inicio"): se abre en modo standalone.
- [ ] Modo avión: la app sigue cargando desde el caché.
- [ ] Publicar una nueva versión (bump `VERSION` en `sw.js`), abrir la app instalada: aparece el banner "Hay una nueva versión disponible — Recargar". Hacer click recarga y la app pasa a la versión nueva sin loop infinito.

## Seguridad

- [ ] Crear un producto con nombre `<script>alert(1)</script>`: se muestra como texto, no ejecuta JS.
- [ ] Importar un JSON donde `name` sea `<img src=x onerror=alert(1)>`: tampoco ejecuta.
- [ ] DevTools → Console: el CSP no reporta violaciones críticas durante uso normal.
- [ ] No hay tráfico de red salvo Google Fonts (verificable en Network tab).

## Layout

- [ ] iPhone SE (375px): la lista de productos no se desborda, los botones del detalle entran en pantalla.
- [ ] Android promedio (412px): igual.
- [ ] Tablet (768px): la app sigue centrada, no se estira en exceso.
