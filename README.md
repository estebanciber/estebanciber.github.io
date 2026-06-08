# Portafolio — María José Arévalo

Portafolio de María José Arévalo (Multimedia y Producción Audiovisual, UDLA Quito), construido en **Astro + SCSS + TypeScript**, con animación en **GSAP** y scroll suave con **Lenis**.

Dirección de arte: **editorial de moda en marfil** (tipografía didone Bodoni Moda + Jost, acento terracota, la fotografía como portada).

Secciones: **Perfil · Diseño & Social · Fotografía (retrato / nocturna / espacios) · Audiovisual (YouTube) · Contacto**.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
npm run check      # type-check de Astro/TS
```

## Estructura

- `src/data/site.ts` — todo el contenido (perfil, contacto, piezas de diseño, fotografía, video). Edítalo aquí.
- `src/data/images.ts` — manifiesto de imágenes; Astro las optimiza a WebP/AVIF responsivos en build.
- `src/assets/images/` — las fotos originales. Para cambiar una, reemplaza el archivo manteniendo el nombre.
- `src/pages/index.astro` — la página.
- `src/styles/editorial.scss` — el sistema visual; `global.scss` el reset; `_mixins.scss` utilidades.
- `src/scripts/motion.ts` — el motor de animación (reveals, parallax, cursor, scroll suave).

## Publicar en GitHub Pages

1. Crea un repositorio y sube **el contenido de esta carpeta** a la rama `main` (el `package.json` debe quedar en la raíz del repo).
2. En **Settings → Pages**, elige **Source: GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` compila y publica en cada push.

El `base` se calcula solo a partir del nombre del repo (el sitio se sirve bajo `https://<usuario>.github.io/<repo>/`). Si usas un repo de usuario (`<usuario>.github.io`), cambia `BASE_PATH: /` en el workflow.

## Accesibilidad y rendimiento

- Contraste verificado (cuerpo ≥ 4.5:1), HTML semántico, focus visible, `alt` descriptivo en español.
- `prefers-reduced-motion` respetado: sin animación ni scroll suave, todo el contenido visible.
- Imágenes diferidas salvo el héroe; servidas en formatos modernos y tamaños responsivos.
