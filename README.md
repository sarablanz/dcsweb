# DCS Consulting — sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build) con 8 páginas:

- `index.html` — Home, con el embudo de 3 pasos (Radar gratis → Ebook $5 → Consultoría)
- `radar.html` — Radar Cloud: autodiagnóstico gratuito en Excel (gancho del embudo)
- `consultoria.html` — Consultoría de riesgos con el método 3P+I (con formulario)
- `formacion.html` — Rutas de formación en riesgos/data science (con formulario)
- `aula-digital-segura.html` — Programa docente de violencia digital (con formulario)
- `ebook.html` — Venta del ebook "El auténtico valor del análisis de riesgos en la era digital" ($5)
- `sobre-nosotros.html` — Equipo
- `contacto.html` — Formulario de contacto general

El logo real (`assets/logo-full.png`, `assets/logo-icon.png`, `assets/favicon.png`) ya está integrado, recortado con fondo transparente a partir de tu `logo.png`.

## Pendientes antes de publicar

- [ ] **Enlace de GitHub del Radar Cloud**: en `radar.html`, reemplaza el `href="#"` del botón "Descargar gratis en GitHub" por la URL real de tu repositorio.
- [ ] **Checkout del ebook**: en `ebook.html`, reemplaza el `href="#"` de "Comprar ebook — $5" por tu producto en Gumroad, Hotmart o Payhip.
- [ ] **Formularios**: crea una cuenta gratuita en [Formspree](https://formspree.io) (u otro proveedor de formularios sin backend), crea un formulario y reemplaza `YOUR_FORM_ID` en:
      `consultoria.html`, `formacion.html`, `aula-digital-segura.html`, `contacto.html`.
      El plan gratuito de Formspree permite 50 envíos al mes.
- [ ] **Nombre de la profesora** que coordinará Aula Digital Segura (en `aula-digital-segura.html` y `sobre-nosotros.html`).
- [ ] **Tu bio** en "Sobre nosotros" (usé tu nombre y una bio genérica como punto de partida).
- [ ] **Fotos del equipo**: aún no las he incorporado — súbelas a `assets/` (por ejemplo `assets/saray.jpg`) e indícame el nombre de archivo para colocarlas en Sobre Nosotros / Home.
- [ ] Revisa todos los comentarios `<!-- TODO: ... -->` restantes en el código.

## Nota sobre el nombre de marca

Tu logo, Instagram y TikTok usan **DCS Consulting**, pero el ebook (portada y texto interno) dice **DSC Consulting**. Dejé el sitio con "DCS" para que coincida con tu marca visual y tus redes — si prefieres unificarlo al revés, dímelo y lo ajusto también en el sitio, o corrige el ebook antes de venderlo para que no haya inconsistencia de cara al cliente.

## Publicar el sitio

Si compraste hosting en **Hostinger** (u otro Apache/LiteSpeed): sube toda la carpeta `paginaweb` por FTP o el Administrador de Archivos, incluyendo el archivo **`.htaccess`** (empieza con punto, puede estar oculto en tu explorador de archivos — asegúrate de que se suba). Ese archivo evita que Hostinger sirva versiones viejas de tu CSS/JS durante 30 días después de cada actualización.

**Cada vez que subas cambios nuevos**, actualiza el número de versión al final de estas líneas en las 8 páginas `.html` (busca y reemplaza `20260726` por la fecha del día, ej. `20260810`):
```
css/style.css?v=20260726
js/main.js?v=20260726
```
Esto obliga al navegador a descargar la versión nueva en vez de la cacheada.

Sin hosting contratado, la forma más simple y gratuita es **Netlify**: crea una cuenta en [netlify.com](https://www.netlify.com) y arrastra la carpeta `paginaweb` a la sección "Deploys" (no hace falta Git ni build). Netlify maneja el cache automáticamente, así que ahí el `.htaccess` no aplica pero tampoco molesta.

## Redes sociales

Instagram: [@dcs_consulting](https://www.instagram.com/dcs_consulting/)
TikTok: [@dcs_consulting](https://www.tiktok.com/@dcs_consulting)
