# DCS Consulting — sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build) con 8 páginas:

- `index.html` — Home, con el embudo de 3 pasos (Radar gratis → Ebook $5 → Consultoría)
- `radar.html` — Radar Cloud: autodiagnóstico gratuito en Excel (gancho del embudo)
- `consultoria.html` — Consultoría de riesgos con el método 3P+I (con formulario)
- `formacion.html` — Rutas de formación en riesgos/data science (con formulario)
- `aula-digital-segura.html` — Programa docente de violencia digital, coordinado por Auri (con formulario)
- `ebook.html` — Venta del ebook "El auténtico valor del análisis de riesgos en la era digital" ($5), con portada animada
- `sobre-nosotros.html` — Equipo: Saray (fundadora), Auri (Aula Digital Segura), Orlando (Product Manager)
- `contacto.html` — Formulario de contacto general

## Publicado en

**GitHub Pages**, repo [sarablanz/dcsweb](https://github.com/sarablanz/dcsweb), rama `main`.

Cada vez que quieras actualizar el sitio en vivo:
```bash
cd paginaweb
git add -A
git commit -m "describe el cambio"
git push
```
GitHub Pages se actualiza solo, unos minutos después del push. No hace falta tocar el número de versión de caché para GitHub Pages (a diferencia de Hostinger), pero es buena práctica subirlo igual si cambias `css/style.css` o `js/*.js`: busca y reemplaza `20260729` por la fecha del día en las 8 páginas `.html`.

**Si aún no activaste GitHub Pages**: entra a `https://github.com/sarablanz/dcsweb/settings/pages` → en "Build and deployment" → Source: **Deploy from a branch** → Branch: **main**, carpeta **/ (root)** → Save. El sitio queda en `https://sarablanz.github.io/dcsweb/`.

## Pendientes antes de compartir el link

- [ ] **Enlace de GitHub del Radar Cloud**: en `radar.html`, reemplaza el `href="#"` del botón "Descargar gratis en GitHub" por la URL real de tu repositorio (puede ser este mismo, con el Excel en una carpeta, o uno aparte).
- [ ] **Checkout del ebook**: en `ebook.html`, reemplaza el `href="#"` de "Comprar ebook — $5" por tu producto en Gumroad, Hotmart o Payhip.
- [ ] **Formularios**: crea una cuenta gratuita en [Formspree](https://formspree.io), crea un formulario y reemplaza `YOUR_FORM_ID` en:
      `consultoria.html`, `formacion.html`, `aula-digital-segura.html`, `contacto.html`.
      El plan gratuito de Formspree permite 50 envíos al mes.
- [ ] Revisa los comentarios `<!-- TODO: ... -->` restantes en el código (apellido de Auri, dominio propio en las etiquetas Open Graph).

## Nota sobre el nombre de marca

Tu logo, Instagram y TikTok usan **DCS Consulting**, pero el ebook (portada y texto interno) dice **DSC Consulting**. Dejé el sitio con "DCS" para que coincida con tu marca visual y tus redes — si prefieres unificarlo al revés, dímelo, o corrige el ebook antes de venderlo para que no haya inconsistencia de cara al cliente.

## Si más adelante compras hosting propio (Hostinger, etc.)

El archivo **`.htaccess`** en la raíz ya está listo para eso — evita que Hostinger sirva versiones viejas de tu CSS/JS durante 30 días después de cada actualización. Solo sube toda la carpeta por FTP/Administrador de Archivos, incluyendo `.htaccess` (empieza con punto, puede estar oculto).

## Redes sociales

Instagram: [@dcs_consulting](https://www.instagram.com/dcs_consulting/)
TikTok: [@dcs_consulting](https://www.tiktok.com/@dcs_consulting)
