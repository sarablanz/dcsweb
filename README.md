# DCS Consulting — sitio web

Sitio estático (HTML/CSS/JS, sin frameworks ni build).

## Páginas

- `index.html` — Home
- `radar.html` — Radar Cloud (landing + formulario de acceso)
- `radar-gracias.html` — post-envío del formulario del Radar
- `radar-app.html` — autodiagnóstico interactivo (14 preguntas)
- `consultoria.html` — Consultoría, método 3P+I
- `ebook.html` — Venta del ebook ($5)
- `sobre-nosotros.html` — Equipo
- `contacto.html` — Contacto
- `privacidad.html` — Política de privacidad
- `formacion.html`, `aula-digital-segura.html` — construidas, sin enlace en el menú por ahora

## Despliegue

GitHub Pages, repo [sarablanz/dcsweb](https://github.com/sarablanz/dcsweb), rama `main`.

```bash
cd paginaweb
git add -A
git commit -m "describe el cambio"
git push
```

Al cambiar `css/style.css` o `js/*.js`, sube el número de versión de caché (`?v=YYYYMMDD`) en las páginas `.html`.

## Dominio

`dcsconsulting.es` vía DonDominio (DNS: 4 registros A a las IPs de GitHub Pages + CNAME `www`; MX intactos para el correo). `CNAME` en la raíz del repo. HTTPS activo.

## Formspree

Cuenta: `dcsconsulting004@gmail.com` · Panel: [formspree.io/forms](https://formspree.io/forms).

- `radar.html`: formulario real (`f/xlgqaark`), envío por `fetch` + redirect manual a `radar-gracias.html` (el `_next` de Formspree es de pago), con `_autoresponse` que manda el Excel por correo.
- `consultoria.html`, `formacion.html`, `aula-digital-segura.html`, `contacto.html`: pendiente reemplazar `YOUR_FORM_ID`. Plan gratis: 50 envíos/mes, sin cobro automático al superarlo.

## Pendiente

- [ ] Checkout del ebook (`href="#"` en `ebook.html`)
- [ ] Formularios restantes (arriba)
- [ ] Revisión legal de `privacidad.html`
- [ ] Unificar "DCS" vs "DSC" entre el sitio y el ebook

## Redes

Instagram / TikTok: [@dcs_consulting](https://www.instagram.com/dcs_consulting/)
