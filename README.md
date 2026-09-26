# jecc.mx

Sitio personal de Juan Esteban Campos Cruz (JECC) — Next.js (App Router) + Tailwind CSS + Framer Motion + Lucide Icons, exportado como sitio estático para GitHub Pages, con dominio propio `jecc.mx`.

## Stack

- Next.js 14 (App Router, `output: 'export'`)
- TypeScript
- Tailwind CSS (dark mode por clase, detecta `prefers-color-scheme` automáticamente)
- Framer Motion (animaciones, layout transitions)
- Lucide React (iconografía)
- i18n propio EN/ES (`lib/i18n.ts`), con auto-detección de `navigator.language` y toggle manual

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Estructura de archivos

```
app/
  layout.tsx        # Shell raíz, fuentes, script anti-flash de tema/idioma
  page.tsx          # Composición de secciones (SPA de una sola página)
  providers.tsx      # ThemeProvider + LanguageProvider (contextos)
  globals.css
components/
  Navbar.tsx         # Dock flotante de navegación con indicador animado
  SocialDock.tsx      # Mini-dock flotante de redes sociales
  ThemeToggle.tsx
  LanguageToggle.tsx
  Hero.tsx
  TechSection.tsx
  MusicSection.tsx
  AutoSection.tsx
  MediaGallery.tsx
  ContactSection.tsx  # Incluye footer
  ui/                 # Primitivos: GlassCard, SpotlightCard, SectionHeading, Badge, CursorGlow, YoutubeEmbed
lib/
  data.ts            # Contenido general (stack, proyectos, mods, galería, etc.)
  links.ts           # Enlaces oficiales (EPK MavelPoint, Events, Linktree) + assets remotos + gigs
  discography.ts      # Catálogo de tracks (DistroKid HyperFollow)
  i18n.ts             # Diccionarios EN/ES
  utils.ts
public/
  CNAME              # jecc.mx — necesario para el dominio personalizado
  assets/            # Coloca aquí tus imágenes locales (proyectos, auto, galería, EPK, etc.)
```

## Placeholders que debes reemplazar

- `lib/data.ts`:
  - `SOCIAL_LINKS` — URLs reales de YouTube, SoundCloud, GitHub, LinkedIn, Instagram.
  - `YOUTUBE_VIDEO_IDS` — IDs reales de videos de YouTube (sets y builds).
  - `PROJECTS[].repoUrl` / `demoUrl` — enlaces reales a tus repos/demos.
  - `PROJECTS[].image`, `AUTO_GALLERY`, `MEDIA_GALLERY` — coloca las imágenes en `public/assets/...` con esos mismos nombres, o cambia las rutas.
  - `SITE.contactEmail` — tu correo real de contacto.
- `lib/links.ts` — ya contiene tus enlaces oficiales reales (MavelPoint EPK/Events, Linktree, assets de artista, gigs). Actualiza `GIGS` según nuevas presentaciones.
- `lib/discography.ts` — agrega nuevos lanzamientos aquí conforme salgan.

## Despliegue en GitHub Pages con dominio jecc.mx

1. **Crea el repositorio en GitHub** (por ejemplo `jecc-site`) y sube este proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/jecc-site.git
   git push -u origin main
   ```

2. **Activa GitHub Pages con GitHub Actions:**
   - Ve a `Settings → Pages` en el repositorio.
   - En "Build and deployment" → **Source**, selecciona **GitHub Actions**.
   - El workflow en `.github/workflows/deploy.yml` se ejecutará automáticamente en cada push a `main`, generará el export estático (`npm run build` → carpeta `out/`) y lo publicará.

3. **Configura el dominio personalizado `jecc.mx`:**
   - El archivo `public/CNAME` ya contiene `jecc.mx`, así que se incluye automáticamente en cada build.
   - En `Settings → Pages → Custom domain`, escribe `jecc.mx` y guarda (GitHub validará el DNS).
   - Marca **Enforce HTTPS** una vez que el certificado esté listo (puede tardar unos minutos/horas).

4. **Configura el DNS en tu proveedor de dominio** (donde compraste `jecc.mx`):
   - Para el dominio raíz (apex, `jecc.mx`), crea 4 registros **A** apuntando a las IPs de GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - (Opcional) Si también quieres `www.jecc.mx`, crea un registro **CNAME**:
     ```
     www  →  TU_USUARIO.github.io
     ```
   - Algunos proveedores soportan `ALIAS`/`ANAME` en la raíz en vez de 4 registros A — usa esa opción si está disponible.

5. **Verifica:** tras la propagación de DNS (minutos a 24-48h), `https://jecc.mx` debe mostrar el sitio con el candado de HTTPS activo.

## Notas técnicas

- `next.config.mjs` usa `output: 'export'` y `images.unoptimized: true` — no se usa `next/image`, solo `<img>` planas, compatibles con export estático y con URLs remotas (CDN de MavelPoint/Linktree) sin configuración adicional.
- El tema (claro/oscuro) se resuelve con un script bloqueante en `<head>` que lee `localStorage` o, si no hay preferencia guardada, `prefers-color-scheme` del sistema — sin parpadeo visual.
- El idioma se detecta con `navigator.language` en el primer render del cliente y se persiste en `localStorage`; el toggle EN/ES vive en el Navbar.
