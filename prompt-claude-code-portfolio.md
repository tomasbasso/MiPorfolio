# Prompt para Claude Code — Portfolio personal (dark + neón, animado)

> Copiá todo lo que está debajo de la línea y pegáselo a Claude Code en una carpeta vacía.

---

Quiero que construyas mi portfolio personal como desarrollador. Es una landing de una sola página (single-page), con secciones ancladas y navegación suave. El foco está en que se vea **impactante, moderno y animado**, pero rápido y profesional (busco trabajo remoto, así que tiene que cargar bien y verse impecable en mobile).

## Objetivo

Sitio personal para mostrar mi perfil, stack y proyectos, con animaciones premium de scroll. Tiene que transmitir "dev full stack serio + buen gusto en frontend".

## Stack técnico (usá exactamente esto)

- **Vite + React 18** (TypeScript).
- **Tailwind CSS** para estilos.
- **Framer Motion** para animaciones de entrada, reveals, hover y transiciones.
- **GSAP + ScrollTrigger** para animaciones ligadas al scroll (pin, parallax, progress).
- **Lenis** para smooth scroll.
- **lucide-react** para iconos.
- Fuentes vía `@fontsource` o Google Fonts.

No uses Three.js ni WebGL: quiero animaciones 2D pulidas, no una experiencia 3D.

## Estética

Dark con acentos neón y gradientes (vibe tech/cyber, pero elegante, sin saturar).

### Paleta (usá estas variables)

```css
--bg:            #0A0A0F;   /* fondo casi negro con tinte azul */
--bg-elev:       #12121A;   /* superficies / cards */
--border:        #1F1F2E;   /* bordes sutiles */
--text:          #E8E8F0;   /* texto principal */
--text-muted:    #8B8B9E;   /* texto secundario */
--neon-cyan:     #22D3EE;   /* acento primario */
--neon-violet:   #7C3AED;   /* acento secundario */
--neon-magenta:  #E879F9;   /* acento puntual */
--grad: linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%);
```

Detalles visuales que quiero:
- Fondo con un **grid sutil** o ruido leve, y **glows/blur radiales** detrás de elementos clave (en violeta/cyan).
- Texto destacado con **gradiente** (`background-clip: text`).
- Bordes con leve **glow** en hover.
- Tarjetas con efecto **glassmorphism** suave (fondo semitransparente + blur).
- Cursor custom opcional (un dot que sigue al mouse y crece en elementos interactivos) — solo en desktop.

### Tipografía

- Títulos: **Space Grotesk** o **Sora** (geométrica, tech).
- Cuerpo: **Inter**.
- Detalles/labels/mono: **JetBrains Mono** (para tags de stack, números de sección, etc).

## Animaciones (nivel "scroll premium")

- **Hero:** texto que aparece con stagger (palabra por palabra o línea por línea), gradiente animado de fondo, y un scroll-indicator animado abajo.
- **Reveal on scroll:** cada sección y card entra con fade + translateY al entrar al viewport (Framer Motion `whileInView`).
- **Parallax:** los glows de fondo y algún elemento decorativo se mueven a distinta velocidad con el scroll (GSAP ScrollTrigger).
- **Stack:** los tags/skills aparecen con stagger y tienen hover con glow.
- **Proyectos:** cards con hover (leve tilt o lift + glow del borde + gradiente que se intensifica). Opcional: número grande de fondo por card.
- **Navbar:** fija, con blur de fondo al scrollear, y link activo resaltado según la sección visible.
- **Barra de progreso de scroll** arriba del todo.
- Respetá `prefers-reduced-motion`: si está activado, desactivá las animaciones de movimiento.

## Estructura de la página (secciones)

1. **Hero** — nombre, rol, una línea de impacto, botones (Ver proyectos / Contacto / Descargar CV), links a GitHub y LinkedIn.
2. **Sobre mí** — el resumen profesional.
3. **Stack tecnológico** — agrupado por categoría (Backend / Frontend / Base de datos / Automatización & DevOps).
4. **Proyectos** — grid de cards, una por proyecto, con stack en tags y resultado destacado.
5. **Experiencia** — timeline vertical animada.
6. **Educación** — dos items.
7. **Contacto** — email, teléfono, redes, y un CTA grande.
8. **Footer** — copyright + links.

## Requisitos técnicos

- Totalmente **responsive** (mobile-first). En mobile las animaciones tienen que ser livianas.
- **Performance:** lazy load de lo pesado, sin layout shift, Lighthouse alto.
- **Accesibilidad:** contraste correcto sobre el dark, navegación por teclado, `aria-label` en links de iconos, `alt` en imágenes.
- **SEO básico:** title, meta description, Open Graph tags.
- Estructura de componentes prolija: un componente por sección en `src/components/`, datos del contenido en un archivo aparte `src/data/content.ts` (así edito el contenido sin tocar el JSX).
- Comentá el código en español.
- Al terminar, dejame instrucciones de cómo correrlo (`npm install`, `npm run dev`) y cómo deployar en Vercel.

## Contenido (datos reales — usá esto tal cual)

### Datos personales
- Nombre: **Tomás Basso Fernández**
- Rol: **Desarrollador Full Stack .NET**
- Ubicación: Winifreda, La Pampa, Argentina — Disponible para reubicación / Full Remote
- Email: tomas.basso@hotmail.com
- Teléfono: +54 2302 524872
- GitHub: github.com/tomasbasso
- LinkedIn: linkedin.com/in/tomásbasso  *(revisar la URL real, las URLs no suelen llevar tilde)*

### Frase de impacto (hero)
"Construyo soluciones reales de negocio: ERPs, e-commerce y automatizaciones con IA, orientadas a escalabilidad y seguridad."

### Sobre mí (resumen)
Desarrollador Full Stack .NET con experiencia en construcción de aplicaciones web empresariales, APIs REST y automatización de procesos con IA. Especializado en ASP.NET Core 8, Entity Framework, autenticación segura (JWT, Identity + 2FA) y frontend moderno con React. Experiencia implementando soluciones reales de negocio (ERP, e-commerce, automatizaciones con LLMs) orientadas a escalabilidad, seguridad y eficiencia operativa.

### Stack tecnológico
- **Backend:** ASP.NET Core 8 (MVC / Web API), Entity Framework Core, LINQ, JWT Authentication, ASP.NET Identity + 2FA, Arquitectura en capas.
- **Frontend:** React.js, JavaScript, Bootstrap 5, AJAX, HTML5 / CSS3.
- **Base de datos:** SQL Server.
- **Automatización & DevOps:** n8n, Docker, Webhooks, Integración con APIs externas, IMAP / Gmail API, Bots de Telegram, Integración con LLMs (OpenAI / Gemini).

### Proyectos

**ERP / Sistema de Inventario – Ferretería**
Stack: ASP.NET Core 8 (MVC), EF Core, Identity + 2FA, SQL Server, Bootstrap, AJAX
Aplicación web para gestión de productos, ventas y control de stock en tiempo real. Autenticación segura con roles y 2FA. Validación automática de inventario previo a facturación. Arquitectura en capas orientada a mantenimiento y escalabilidad.
Resultado: Digitalización completa del proceso comercial y reducción de errores operativos.

**App Móvil de Finanzas Personales**
Stack: .NET MAUI, ASP.NET Core API, JWT
Aplicación multiplataforma conectada a una API REST propia. Autenticación segura mediante JWT. Arquitectura cliente-servidor desacoplada.

**E-Commerce – Paz Sport**
Stack: React.js, ASP.NET Core Web API, SQL Server
Plataforma de ventas online con panel administrativo. Gestión dinámica de productos, descuentos y promociones. Consumo de APIs REST y persistencia relacional. Soporte para múltiples sucursales.
Resultado: Centralización de catálogo y automatización de promociones comerciales.

**Automatización de Procesos con IA**
Stack: n8n, Docker, Webhooks, IMAP/Gmail API, OpenAI / Gemini
Workflows automatizados para procesamiento de correos y extracción de datos no estructurados. Integración con bots de Telegram y generación automática de reportes estructurados. Despliegue en contenedores Docker.
Resultado: Reducción significativa de tareas administrativas manuales.

### Experiencia
- **Concejal** — Municipalidad de Winifreda, La Pampa (03/2024 – Actualidad). Análisis y gestión de proyectos, negociación con diferentes actores sociales, resolución de conflictos y toma de decisiones estratégicas.
- **Gestión Administrativa** — La Segunda Seguros / Avalián (01/2017 – Actualidad). Atención directa al cliente, resolución de reclamos bajo presión y optimización de tiempos de respuesta mediante sistemas de gestión.

### Educación
- **Técnico Superior en Desarrollo de Software** — Instituto Tecnológico de Educación Superior (03/2022 – 12/2025). Finalizada.
- **Técnico en Informática de Gestión** — Universidad Nacional de La Pampa (03/2018 – 04/2022). Finalizada.

### Habilidades blandas e idiomas
- Excelente trato interpersonal, comunicación asertiva, adaptabilidad al cambio, resolución de problemas y trabajo en equipo.
- Inglés básico (en curso).

---

Empezá creando la estructura del proyecto y el archivo de contenido, después armá sección por sección. Mostrame el resultado para ir iterando.
