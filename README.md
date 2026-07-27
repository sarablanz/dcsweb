# DCS Consulting — sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build) con 9 páginas:

- `index.html` — Home, con el embudo de 3 pasos (Radar gratis → Ebook $5 → Consultoría)
- `radar.html` — Radar Cloud: landing del autodiagnóstico gratuito (app interactiva o Excel descargable)
- `radar-app.html` — el autodiagnóstico interactivo en sí: 14 preguntas paso a paso, resultado con semáforo de riesgo priorizado y guía de alertas nativas (M365/Google Workspace/AWS). Lógica en `js/radar-app.js`, datos embebidos en el propio script (mismos 14 riesgos y puntuaciones del kit Excel).
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

- [ ] **Checkout del ebook**: en `ebook.html`, reemplaza el `href="#"` de "Comprar ebook — $5" por tu producto en Gumroad, Hotmart o Payhip.
- [ ] **Formularios**: crea una cuenta gratuita en [Formspree](https://formspree.io), crea un formulario y reemplaza `YOUR_FORM_ID` en:
      `consultoria.html`, `formacion.html`, `aula-digital-segura.html`, `contacto.html`.
      El plan gratuito de Formspree permite 50 envíos al mes.
## Dominio propio (dcsconsulting.es)

El dominio se compró en DonDominio y usa sus servidores DNS (`ns1.dondominio.com` / `ns2.dondominio.com`), con un servicio de Mail asignado. Para que `dcsconsulting.es` muestre este sitio (en vez de `sarablanz.github.io/dcsweb`):

1. **En el panel de DonDominio** (Dominio → DNS / Zona DNS del dominio):
   - Desactiva la **"Parking page"** (si no, sobreescribe cualquier registro que agregues).
   - Agrega 4 registros **A** en la raíz (`@`) apuntando a las IPs de GitHub Pages:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Agrega un registro **CNAME** para `www` → `sarablanz.github.io.`
   - **No toques los registros MX** — esos son los que hacen funcionar el correo del dominio (el servicio Mail que ya tienes asignado).
2. **En GitHub**: el archivo `CNAME` en la raíz del repo (ya incluido, contiene `dcsconsulting.es`) le dice a GitHub Pages qué dominio servir. Ve a `https://github.com/sarablanz/dcsweb/settings/pages` y confirma que en "Custom domain" aparece `dcsconsulting.es` con el check verde (puede tardar hasta 24h en verificar DNS) y activa **Enforce HTTPS** cuando esté disponible.
3. Una vez propagado, actualiza los enlaces de Instagram/TikTok y cualquier material de marketing para usar `dcsconsulting.es` en vez del link de GitHub Pages.

## Nota sobre el nombre de marca

Tu logo, Instagram y TikTok usan **DCS Consulting**, pero el ebook (portada y texto interno) dice **DSC Consulting**. Dejé el sitio con "DCS" para que coincida con tu marca visual y tus redes — si prefieres unificarlo al revés, dímelo, o corrige el ebook antes de venderlo para que no haya inconsistencia de cara al cliente.

## Si más adelante compras hosting propio (Hostinger, etc.)

El archivo **`.htaccess`** en la raíz ya está listo para eso — evita que Hostinger sirva versiones viejas de tu CSS/JS durante 30 días después de cada actualización. Solo sube toda la carpeta por FTP/Administrador de Archivos, incluyendo `.htaccess` (empieza con punto, puede estar oculto).

## Redes sociales

Instagram: [@dcs_consulting](https://www.instagram.com/dcs_consulting/)
TikTok: [@dcs_consulting](https://www.tiktok.com/@dcs_consulting)
