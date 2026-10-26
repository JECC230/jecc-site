# info.jecc.mx

Sitio personal de Juan Esteban Campos Cruz (JECC) — Next.js (App Router) + Tailwind CSS + Framer Motion + Lucide Icons, exportado como sitio estático para GitHub Pages, con dominio propio `info.jecc.mx`.

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
  CNAME              # info.jecc.mx — necesario para el dominio personalizado
  assets/            #  tus imágenes locales (proyectos, auto, galería, EPK, etc.)
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
