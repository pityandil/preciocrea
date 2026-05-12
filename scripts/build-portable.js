#!/usr/bin/env node
/**
 * Genera preciocrea-portable.html: un único archivo HTML con todo el
 * código y assets inline. Para distribuir por WhatsApp/email/Drive
 * cuando no se puede usar el link público.
 *
 * Limitaciones del portable vs. versión servida en HTTPS:
 *   - NO funciona como PWA instalable (Service Worker requiere HTTPS).
 *   - No tiene auto-update vía banner; el usuario debe descargar de
 *     nuevo el archivo cuando cambies algo.
 *   - localStorage sí funciona normalmente.
 *
 * Uso:  node scripts/build-portable.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const readB64 = (rel) => fs.readFileSync(path.join(ROOT, rel)).toString('base64');

const html  = read('index.html');
const css   = read('css/styles.css');
const js    = read('js/app.js');
const icon  = `data:image/png;base64,${readB64('assets/icons/icon-192.png')}`;

// Sustituciones:
let out = html;

// 1) Reemplazar el <link rel="stylesheet" href="css/styles.css"> por <style>...</style>
out = out.replace(
  /<link\s+rel="stylesheet"\s+href="css\/styles\.css">/,
  `<style>\n${css}\n</style>`
);

// 2) Reemplazar <script src="js/app.js"></script> por <script>...</script>
//    En la versión portable quitamos el bloque del Service Worker
//    delimitado por // BUILD-PORTABLE-STRIP-START / END.
const jsNoSW = js.replace(
  /\/\/ BUILD-PORTABLE-STRIP-START[\s\S]*?\/\/ BUILD-PORTABLE-STRIP-END\n?/g,
  '// PWA Service Worker omitido en versión portable (requiere HTTPS).\n'
);
out = out.replace(
  /<script\s+src="js\/app\.js"><\/script>/,
  `<script>\n${jsNoSW}\n</script>`
);

// 3) Reemplazar referencias a íconos y manifest por data URIs / inline
out = out.replace(/href="\.\/assets\/icons\/icon-192\.png"/g, `href="${icon}"`);

// 4) Quitar el link al manifest (no aplica en archivo único)
out = out.replace(/<link\s+rel="manifest"[^>]*>\s*\n?/g, '');

// 5) Comentario de cabecera para que el usuario sepa qué archivo es
const header = `<!--
  PrecioCrea — versión portable (archivo único)
  Generado: ${new Date().toISOString().slice(0,10)}
  Para PWA instalable visita la versión publicada.
-->\n`;
out = out.replace(/<!DOCTYPE html>/i, `<!DOCTYPE html>\n${header}`);

const outPath = path.join(ROOT, 'preciocrea-portable.html');
fs.writeFileSync(outPath, out, 'utf8');

const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`✅ preciocrea-portable.html generado (${sizeKb} KB)`);
console.log(`   Distribúyelo por WhatsApp/Drive/email a quien no abra el link.`);
