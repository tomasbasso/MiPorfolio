# Portfolio Personal — Tomás Basso Fernández
**Fecha:** 2026-06-02  
**Estado:** Aprobado  

---

## Objetivo

Sitio web de portfolio personal estilo SPA (single-page), orientado a reclutadores. Transmitir perfil de desarrollador Full Stack .NET serio con buen gusto en frontend. Disponible para trabajo remoto y reubicación.

---

## Stack técnico

| Herramienta | Uso |
|---|---|
| Vite + React 18 + TypeScript | Base del proyecto |
| Tailwind CSS | Estilos utilitarios |
| Framer Motion | Animaciones de entrada, reveals, hover, stagger |
| GSAP + ScrollTrigger | Parallax y animaciones ligadas al scroll |
| Lenis | Smooth scroll — **integrar con ScrollTrigger**: `lenis.on('scroll', ScrollTrigger.update)`, loop vía `gsap.ticker.add((time) => lenis.raf(time * 1000))` + `gsap.ticker.lagSmoothing(0)`. No usar `requestAnimationFrame` propio de Lenis para evitar doble loop. |
| lucide-react | Iconografía |
| @fontsource/space-grotesk | Fuente títulos |
| @fontsource/inter | Fuente cuerpo |
| @fontsource/jetbrains-mono | Fuente labels/tags/mono |

---

## Sistema visual

### Paleta de colores

```css
--bg:           #0A0A0F;   /* fondo principal */
--bg-elev:      #12121A;   /* superficies / cards */
--border:       #1F1F2E;   /* bordes sutiles */
--text:         #E8E8F0;   /* texto principal */
--text-muted:   #8B8B9E;   /* texto secundario */
--neon-cyan:    #22D3EE;   /* acento primario */
--neon-violet:  #7C3AED;   /* acento secundario */
--neon-magenta: #E879F9;   /* acento puntual */
--grad: linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%);
```

### Tipografía

- **Títulos:** Space Grotesk (700)
- **Cuerpo:** Inter (400/500)
- **Labels / tags / números de sección:** JetBrains Mono

### Detalles visuales

- Fondo con grid CSS sutil + glows radiales en violeta/cyan detrás de elementos clave
- Texto destacado con `background-clip: text` + gradiente
- Cards con glassmorphism suave (`background: rgba` + `backdrop-blur`)
- Bordes con glow en hover (`box-shadow: 0 0 Xpx var(--neon-cyan)`)
- Cursor custom (dot que sigue al mouse, escala en elementos interactivos) — solo desktop, `@media (pointer: fine)`. **No ocultar el cursor nativo: dejar fallback visible por accesibilidad.**
- Barra de progreso de scroll en el top del viewport

---

## Arquitectura de archivos

```
src/
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Stack.tsx
    Projects.tsx
    Experience.tsx
    Education.tsx
    Contact.tsx
    Footer.tsx
    CustomCursor.tsx
  data/
    content.ts        ← todo el contenido separado del JSX
  styles/
    globals.css       ← variables CSS, fuentes, reset
  App.tsx
  main.tsx
public/
  FotoPersonal.png
  MiLogoPersonal.png
  CV_Basso_Tomas.pdf
  og-image.png        ← 1200×630, preview al compartir el link
index.html            ← title, meta, OG tags
```

---

## Secciones

### 1. Navbar
- Fija en top, z-index alto
- Logo `MiLogoPersonal.png` a la izquierda
- Links de navegación a la derecha: **Sobre mí / Stack / Proyectos / Experiencia / Contacto** (Hero y Educación quedan sin link en nav a propósito)
- Al scrollear: `backdrop-blur` + fondo semitransparente (transición CSS)
- Link activo resaltado con `--neon-cyan` según sección visible (IntersectionObserver)
- Mobile: menú hamburguesa con drawer

### 2. Hero (layout A — split horizontal)
- **Izquierda:**
  - Tag JetBrains Mono: `"Full Stack .NET · 01"` en cyan
  - Nombre con stagger por palabra (Framer Motion), parte en gradiente
  - Rol en texto muted
  - Frase de impacto
  - Botones: `Ver proyectos` (gradiente), `Contacto` (outline), `↓ CV` (outline) — el CV descarga `CV_Basso_Tomas.pdf`
  - Links GitHub y LinkedIn con iconos lucide + `aria-label`
- **Derecha:**
  - `FotoPersonal.png` en `border-radius: 50%` con ring `--neon-cyan` + glow radial `--neon-violet` detrás
  - Glow animado (Framer Motion `animate` loop suave)
- Scroll indicator animado al fondo (bounce loop)
- Fondo: glow radial violeta top-left + glow radial cyan bottom-right

### 3. Sobre mí
- Número de sección grande (`02`) en fondo, color `--border`
- Resumen profesional en dos párrafos
- Reveal on scroll: fade + translateY (Framer Motion `whileInView`)

### 4. Stack tecnológico
- Número de sección `03`
- 4 grupos: **Backend / Frontend / Base de datos / Automatización & DevOps**
- Cada grupo con título en JetBrains Mono y tags individuales
- Tags: stagger de entrada al entrar viewport, hover glow (`--neon-cyan` o `--neon-magenta`)
- Acento de color distinto por grupo

### 5. Proyectos (grid 2×2)
- Número de sección `04`
- Grid `grid-cols-2`, gap uniforme
- Cada card:
  - Barra de gradiente superior (color único por proyecto)
  - Número grande (`01`–`04`) en fondo color `--border`
  - Título en bold, descripción breve, tags de stack
  - Resultado en `--neon-cyan` si aplica
  - Hover: `translateY(-4px)` + border glow (Framer Motion `whileHover`)
- Reveal on scroll por card con stagger

**Proyectos:**
1. ERP / Inventario – Ferretería · grad violet→cyan
2. App Móvil Finanzas · grad magenta→violet
3. E-Commerce Paz Sport · grad cyan→magenta
4. Automatización con IA · grad violet→magenta

### 6. Experiencia
- Número de sección `05`
- Timeline vertical: línea de gradiente izquierda, items a la derecha
- Entrada staggered por item (Framer Motion)
- **Items:**
  - Concejal — Municipalidad de Winifreda (03/2024 – Actualidad)
  - Gestión Administrativa — La Segunda Seguros / Avalián (01/2017 – Actualidad)

### 7. Educación
- Número de sección `06`
- Dos items con ícono (lucide `GraduationCap`), reveal on scroll
- **Items:**
  - Técnico Superior en Desarrollo de Software — ITES (2022–2025)
  - Técnico en Informática de Gestión — UNLPam (2018–2022)

### 8. Contacto
- Número de sección `07`
- CTA grande con gradiente: "¿Hablamos?" o similar
- Cards/chips para: email, teléfono, GitHub, LinkedIn — con iconos lucide y `aria-label`
- Badges de disponibilidad: `Reubicación` + `Full Remote`

### 9. Footer
- Logo TB pequeño centrado
- Copyright con año dinámico: `© {new Date().getFullYear()} Tomás Basso Fernández`
- Links GitHub + LinkedIn con iconos

---

## Animaciones

| Zona | Librería | Tipo |
|---|---|---|
| Hero — nombre | Framer Motion | Stagger palabra por palabra |
| Hero — foto glow | Framer Motion | Loop de opacity/scale suave |
| Secciones/cards | Framer Motion `whileInView` | fade + translateY, `once: true` |
| Stack tags | Framer Motion | Stagger de entrada por grupo |
| Proyectos cards hover | Framer Motion `whileHover` | lift + border glow |
| Glows de fondo | GSAP ScrollTrigger | Parallax a distinta velocidad |
| Navbar blur | CSS transition | Al superar 80px de scroll |
| Scroll progress bar | CSS + scroll listener | `scaleX` desde 0 a 1 |
| Cursor custom | requestAnimationFrame | Dot que sigue al mouse |
| `prefers-reduced-motion` | CSS + hook React | Desactiva transforms |

---

## Requisitos técnicos

- **Responsive:** mobile-first, breakpoints Tailwind. En mobile: hero apilado, grid de proyectos 1 columna, animaciones livianas.
- **Performance:** imágenes con `loading="lazy"`, sin layout shift (dimensiones explícitas en img), fuentes con `font-display: swap`.
- **Accesibilidad:** contraste AA mínimo (4.5:1 texto normal, 3:1 texto grande), AAA donde sea posible; `aria-label` en links de iconos; `alt` en imágenes; navegación por teclado funcional.
- **SEO:** `<title>`, `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image` apuntando a `/og-image.png`).

---

## Assets

| Archivo | Uso |
|---|---|
| `FotoPersonal.png` | Hero — foto de perfil |
| `MiLogoPersonal.png` | Navbar + favicon |
| `CV_Basso_Tomas.pdf` | Botón "↓ CV" en hero |
| `og-image.png` | Open Graph preview (1200×630) — crear manualmente o generar |

---

## Contenido — URLs y datos de contacto

- **Email:** tomas.basso@hotmail.com
- **Teléfono:** +54 2302 524872
- **GitHub:** https://github.com/tomasbasso
- **LinkedIn:** https://linkedin.com/in/tomasbasso
