# Prompt para Claude Code — Portfolio personal (dark + neón, animado)

> Copiá todo lo que está debajo de la línea y pegáselo a Claude Code en una carpeta vacía.

---

Quiero que construyas mi portfolio personal como desarrollador: una SPA (single-page) orientada a reclutadores, que transmita un perfil de **Full Stack .NET serio con buen gusto en frontend**. Busco trabajo remoto y reubicación. Tiene que verse **impactante y animado**, pero rápido y profesional, e impecable en mobile.

## Stack técnico (usá exactamente esto)

- **Vite + React 18 + TypeScript** — base del proyecto.
- **Tailwind CSS** — estilos utilitarios.
- **Framer Motion** — animaciones de entrada, reveals, hover, stagger.
- **GSAP + ScrollTrigger** — parallax y animaciones ligadas al scroll.
- **Lenis** — smooth scroll.
- **lucide-react** — iconografía.
- Fuentes vía `@fontsource`: `space-grotesk`, `inter`, `jetbrains-mono`.

No uses Three.js ni WebGL: quiero animaciones 2D pulidas, no una experiencia 3D.

### ⚠️ Sincronización Lenis + ScrollTrigger (hacelo bien desde el principio)
Lenis y ScrollTrigger manejan el scroll por separado y, si no los conectás, el parallax queda desfasado o tembloroso. Integralos así:
- `lenis.on('scroll', ScrollTrigger.update)`
- Manejá el loop de Lenis con `gsap.ticker.add((time) => lenis.raf(time * 1000))` y `gsap.ticker.lagSmoothing(0)`.
- Desactivá el `requestAnimationFrame` propio de Lenis (no llames a `requestAnimationFrame(raf)` aparte) para que no haya doble loop.

## Sistema visual

Dark con acentos neón y gradientes (vibe tech, elegante, sin saturar).

### Paleta (variables CSS)
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
- Fondo con grid CSS sutil + glows radiales en violeta/cyan detrás de elementos clave.
- Texto destacado con `background-clip: text` + gradiente.
- Cards con glassmorphism suave (`background: rgba` + `backdrop-blur`).
- Bordes con glow en hover (`box-shadow: 0 0 Xpx var(--neon-cyan)`).
- Cursor custom (dot que sigue al mouse, escala en elementos interactivos), solo desktop con `@media (pointer: fine)`. **No ocultes del todo el cursor nativo: dejá un fallback visible por accesibilidad.**
- Barra de progreso de scroll en el top del viewport.

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
  og-image.png        ← 1200×630, para preview al compartir el link
index.html            ← title, meta, OG tags
```

## Secciones

### 1. Navbar
- Fija en top, z-index alto. Logo `MiLogoPersonal.png` a la izquierda.
- Links a la derecha: Sobre mí / Stack / Proyectos / Experiencia / Contacto. (El Hero y Educación quedan sin link a propósito.)
- Al scrollear más de 80px: `backdrop-blur` + fondo semitransparente (transición CSS).
- Link activo resaltado con `--neon-cyan` según sección visible (IntersectionObserver).
- Mobile: menú hamburguesa con drawer.

### 2. Hero (split horizontal)
- **Izquierda:**
  - Tag JetBrains Mono: `"Full Stack .NET · 01"` en cyan.
  - Nombre con stagger por palabra (Framer Motion), parte en gradiente.
  - Rol en texto muted.
  - Frase de impacto: *"Construyo soluciones reales de negocio: ERPs, e-commerce y automatizaciones con IA, orientadas a escalabilidad y seguridad."*
  - Botones: `Ver proyectos` (gradiente), `Contacto` (outline), `↓ CV` (outline, descarga `CV_Basso_Tomas.pdf`).
  - Links GitHub y LinkedIn con iconos lucide + `aria-label`.
- **Derecha:**
  - `FotoPersonal.png` circular con ring `--neon-cyan` + glow radial `--neon-violet` detrás.
  - Glow animado en loop suave (Framer Motion `animate`).
- Scroll indicator animado al fondo (bounce loop).
- Fondo: glow radial violeta top-left + glow radial cyan bottom-right.

### 3. Sobre mí
- Número de sección grande (`02`) en fondo, color `--border`.
- Resumen profesional en dos párrafos.
- Reveal on scroll: fade + translateY (Framer Motion `whileInView`, `once: true`).

### 4. Stack tecnológico
- Número de sección `03`.
- 4 grupos: **Backend / Frontend / Base de datos / Automatización & DevOps**.
- Cada grupo con título en JetBrains Mono y tags individuales.
- Tags: stagger de entrada al viewport, hover glow. Acento de color distinto por grupo.

### 5. Proyectos (grid 2×2)
- Número de sección `04`. Grid `grid-cols-2`, gap uniforme. En mobile pasa a 1 columna.
- Cada card: barra de gradiente superior (color único por proyecto), número grande (`01`–`04`) en fondo color `--border`, título bold, descripción breve, tags de stack, resultado en `--neon-cyan` si aplica.
- Hover: `translateY(-4px)` + border glow (Framer Motion `whileHover`).
- Reveal on scroll por card con stagger.
- Gradientes: 1) violet→cyan · 2) magenta→violet · 3) cyan→magenta · 4) violet→magenta.

### 6. Experiencia
- Número de sección `05`. Timeline vertical: línea de gradiente a la izquierda, items a la derecha, entrada staggered.

### 7. Educación
- Número de sección `06`. Dos items con ícono lucide `GraduationCap`, reveal on scroll.

### 8. Contacto
- Número de sección `07`. CTA grande con gradiente ("¿Hablamos?").
- Chips para email, teléfono, GitHub, LinkedIn (iconos lucide + `aria-label`).
- Badges de disponibilidad: `Reubicación` + `Full Remote`.

### 9. Footer
- Logo TB pequeño centrado.
- Copyright con **año dinámico**: `© {new Date().getFullYear()} Tomás Basso Fernández`.
- Links GitHub + LinkedIn con iconos.

## Animaciones (resumen)
- Hero nombre: stagger palabra por palabra (Framer Motion).
- Hero foto: loop suave de opacity/scale.
- Secciones/cards: `whileInView` fade + translateY, `once: true`.
- Stack tags: stagger por grupo.
- Proyectos hover: lift + border glow.
- Glows de fondo: parallax con GSAP ScrollTrigger (a distinta velocidad).
- Navbar: blur al superar 80px.
- Scroll progress bar: `scaleX` 0→1.
- Cursor custom: `requestAnimationFrame`.
- **`prefers-reduced-motion`:** hook + CSS que desactiva los transforms/animaciones de movimiento si está activado.

## Requisitos técnicos
- **Responsive:** mobile-first, breakpoints Tailwind. En mobile: hero apilado, proyectos en 1 columna, animaciones livianas.
- **Performance:** imágenes con `loading="lazy"` y dimensiones explícitas (sin layout shift), fuentes con `font-display: swap`.
- **Accesibilidad:** contraste **AA (mínimo 4.5:1 en texto normal, 3:1 en texto grande), AAA donde sea posible**; `aria-label` en links de iconos; `alt` en imágenes; navegación por teclado funcional.
- **SEO:** `<title>`, `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image` apuntando a `/og-image.png`).
- Estructura prolija: un componente por sección, contenido en `src/data/content.ts`. Comentá el código en español.
- Al terminar, dejame instrucciones de cómo correrlo (`npm install`, `npm run dev`) y cómo deployar en Vercel.

## Contenido (datos reales — usá esto tal cual)

### Datos personales
- Nombre: **Tomás Basso Fernández**
- Rol: **Desarrollador Full Stack .NET**
- Ubicación: Winifreda, La Pampa, Argentina — Disponible para reubicación / Full Remote
- Email: tomas.basso@hotmail.com
- Teléfono: +54 2302 524872
- GitHub: https://github.com/tomasbasso
- LinkedIn: https://linkedin.com/in/tomasbasso

### Sobre mí (resumen)
Desarrollador Full Stack .NET con experiencia en construcción de aplicaciones web empresariales, APIs REST y automatización de procesos con IA. Especializado en ASP.NET Core 8, Entity Framework, autenticación segura (JWT, Identity + 2FA) y frontend moderno con React. Experiencia implementando soluciones reales de negocio (ERP, e-commerce, automatizaciones con LLMs) orientadas a escalabilidad, seguridad y eficiencia operativa.

### Stack tecnológico
- **Backend:** ASP.NET Core 8 (MVC / Web API), Entity Framework Core, LINQ, JWT Authentication, ASP.NET Identity + 2FA, Arquitectura en capas.
- **Frontend:** React.js, JavaScript, Bootstrap 5, AJAX, HTML5 / CSS3.
- **Base de datos:** SQL Server.
- **Automatización & DevOps:** n8n, Docker, Webhooks, Integración con APIs externas, IMAP / Gmail API, Bots de Telegram, Integración con LLMs (OpenAI / Gemini).

### Proyectos

**1. ERP / Sistema de Inventario – Ferretería** · grad violet→cyan
Stack: ASP.NET Core 8 (MVC), EF Core, Identity + 2FA, SQL Server, Bootstrap, AJAX
Aplicación web para gestión de productos, ventas y control de stock en tiempo real. Autenticación segura con roles y 2FA. Validación automática de inventario previo a facturación. Arquitectura en capas orientada a mantenimiento y escalabilidad.
Resultado: Digitalización completa del proceso comercial y reducción de errores operativos.

**2. App Móvil de Finanzas Personales** · grad magenta→violet
Stack: .NET MAUI, ASP.NET Core API, JWT
Aplicación multiplataforma conectada a una API REST propia. Autenticación segura mediante JWT. Arquitectura cliente-servidor desacoplada.

**3. E-Commerce – Paz Sport** · grad cyan→magenta
Stack: React.js, ASP.NET Core Web API, SQL Server
Plataforma de ventas online con panel administrativo. Gestión dinámica de productos, descuentos y promociones. Consumo de APIs REST y persistencia relacional. Soporte para múltiples sucursales.
Resultado: Centralización de catálogo y automatización de promociones comerciales.

**4. Automatización de Procesos con IA** · grad violet→magenta
Stack: n8n, Docker, Webhooks, IMAP/Gmail API, OpenAI / Gemini
Workflows automatizados para procesamiento de correos y extracción de datos no estructurados. Integración con bots de Telegram y generación automática de reportes estructurados. Despliegue en contenedores Docker.
Resultado: Reducción significativa de tareas administrativas manuales.

### Experiencia
- **Concejal** — Municipalidad de Winifreda, La Pampa (03/2024 – Actualidad). Análisis y gestión de proyectos, negociación con diferentes actores sociales, resolución de conflictos y toma de decisiones estratégicas.
- **Gestión Administrativa** — La Segunda Seguros / Avalián (01/2017 – Actualidad). Atención directa al cliente, resolución de reclamos bajo presión y optimización de tiempos de respuesta mediante sistemas de gestión.

### Educación
- **Técnico Superior en Desarrollo de Software** — Instituto Tecnológico de Educación Superior (03/2022 – 12/2025). Finalizada.
- **Técnico en Informática de Gestión** — Universidad Nacional de La Pampa (03/2018 – 04/2022). Finalizada.

---

Empezá creando la estructura del proyecto y `src/data/content.ts`, después armá sección por sección. Mostrame el resultado para ir iterando.
