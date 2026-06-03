# Portfolio SPA — Tomás Basso Fernández — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portfolio SPA dark+neón con Vite + React 18 + TypeScript, animaciones con Framer Motion y GSAP, para mostrar perfil de desarrollador Full Stack .NET ante reclutadores.

**Architecture:** SPA de una sola página con 8 secciones ancladas. Todo el contenido vive en `src/data/content.ts` separado del JSX. Los componentes se montan en `App.tsx` donde también se inicializa Lenis (smooth scroll) sincronizado con GSAP ScrollTrigger.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS v3, Framer Motion, GSAP + ScrollTrigger, Lenis, lucide-react, @fontsource (space-grotesk, inter, jetbrains-mono), Vitest + React Testing Library.

---

## Estructura de archivos

```
src/
  components/
    Navbar.tsx          ← fija, blur al scroll, link activo por IntersectionObserver
    Hero.tsx            ← split horizontal, stagger, foto con glow
    About.tsx           ← reveal on scroll, número de sección decorativo
    Stack.tsx           ← 4 grupos de tags con stagger
    Projects.tsx        ← grid 2×2, cards con hover lift+glow
    Experience.tsx      ← timeline vertical animada
    Education.tsx       ← 2 items con ícono GraduationCap
    Contact.tsx         ← chips de contacto, badges de disponibilidad
    Footer.tsx          ← logo, copyright dinámico, links
    CustomCursor.tsx    ← dot custom solo desktop
    ScrollProgress.tsx  ← barra de progreso top
  hooks/
    useReducedMotion.ts ← detecta prefers-reduced-motion
    useScrollProgress.ts← scroll position 0→1
    useActiveSection.ts ← IntersectionObserver para nav activa
  data/
    content.ts          ← TODO el contenido, sin JSX
  styles/
    globals.css         ← variables CSS, fuentes, grid background
  App.tsx               ← Lenis init, ensamble de secciones
  main.tsx
public/
  FotoPersonal.png
  MiLogoPersonal.png
  CV_Basso_Tomas.pdf
  og-image.png
index.html
```

---

## Task 1: Scaffolding del proyecto

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`

- [ ] **Step 1: Crear proyecto Vite**

```bash
cd "C:/Users/UD/Desktop/MiPorfolio"
npm create vite@latest . -- --template react-ts
```
Responder `y` si pregunta si sobreescribir. Esto genera `src/`, `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`.

- [ ] **Step 2: Instalar dependencias de producción**

```bash
npm install framer-motion gsap lenis lucide-react \
  @fontsource/space-grotesk @fontsource/inter @fontsource/jetbrains-mono
```

- [ ] **Step 3: Instalar dependencias de desarrollo**

```bash
npm install -D tailwindcss postcss autoprefixer \
  @vitest/ui vitest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom
```

- [ ] **Step 4: Inicializar Tailwind**

```bash
npx tailwindcss init -p
```

- [ ] **Step 5: Configurar tailwind.config.ts**

Reemplazar el contenido de `tailwind.config.ts` con:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        'bg-elev': '#12121A',
        border: '#1F1F2E',
        text: '#E8E8F0',
        muted: '#8B8B9E',
        cyan: '#22D3EE',
        violet: '#7C3AED',
        magenta: '#E879F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Configurar Vitest en vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
})
```

- [ ] **Step 7: Crear src/test-setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Limpiar archivos generados por Vite que no se usan**

Eliminar: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`.
Vaciar `src/App.tsx` (solo export vacío por ahora).

- [ ] **Step 9: Verificar que el proyecto compila**

```bash
npm run build
```
Esperado: sin errores. Si hay error de `App.tsx` vacío, poner `export default function App() { return null }`.

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite+React+TS con Tailwind y dependencias"
```

---

## Task 2: Assets en public/

**Files:**
- Copy assets to `public/`

- [ ] **Step 1: Renombrar y copiar el CV**

El archivo en la carpeta raíz se llama `CV Basso_Tomas.pdf` (con espacio). Copiarlo a `public/` con nombre correcto:

```bash
cp "CV Basso_Tomas.pdf" "public/CV_Basso_Tomas.pdf"
```

- [ ] **Step 2: Copiar imagen de perfil y logo**

```bash
cp FotoPersonal.png public/FotoPersonal.png
cp MiLogoPersonal.png public/MiLogoPersonal.png
```

- [ ] **Step 3: Crear og-image placeholder**

El archivo `public/og-image.png` es necesario para Open Graph. Crear un placeholder de 1×1 px por ahora (reemplazar manualmente con imagen 1200×630 antes de publicar):

```bash
# Crear un PNG mínimo válido con Node
node -e "
const fs = require('fs');
// PNG 1x1 transparente (bytes mínimos válidos)
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
fs.writeFileSync('public/og-image.png', png);
console.log('og-image.png creado');
"
```

- [ ] **Step 4: Verificar assets**

```bash
ls public/
```
Esperado: `CV_Basso_Tomas.pdf  FotoPersonal.png  MiLogoPersonal.png  og-image.png`

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: agregar assets (foto, logo, CV, og-image)"
```

---

## Task 3: globals.css — variables CSS, fuentes, grid

**Files:**
- Create: `src/styles/globals.css`

- [ ] **Step 1: Crear src/styles/globals.css**

```css
/* Fuentes */
@import '@fontsource/space-grotesk/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/jetbrains-mono/400.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables */
:root {
  --bg:           #0A0A0F;
  --bg-elev:      #12121A;
  --border:       #1F1F2E;
  --text:         #E8E8F0;
  --text-muted:   #8B8B9E;
  --neon-cyan:    #22D3EE;
  --neon-violet:  #7C3AED;
  --neon-magenta: #E879F9;
  --grad: linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%);
}

/* Reset base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: auto; } /* Lenis maneja el scroll suave */

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Grid sutil de fondo */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

/* Gradiente de texto reutilizable */
.grad-text {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glassmorphism base */
.glass {
  background: rgba(18, 18, 26, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
}

/* Reducción de movimiento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Importar globals.css en main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 3: Verificar que dev server levanta sin errores**

```bash
npm run dev
```
Esperado: fondo oscuro en `http://localhost:5173`.

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css src/main.tsx
git commit -m "feat: globals.css con variables CSS, fuentes y grid de fondo"
```

---

## Task 4: src/data/content.ts — todo el contenido

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Crear src/data/content.ts**

```ts
// Contenido del portfolio — editar aquí sin tocar los componentes

export const personal = {
  nombre: 'Tomás Basso Fernández',
  rol: 'Desarrollador Full Stack .NET',
  ubicacion: 'Winifreda, La Pampa, Argentina',
  disponibilidad: ['Reubicación', 'Full Remote'],
  email: 'tomas.basso@hotmail.com',
  telefono: '+54 2302 524872',
  github: 'https://github.com/tomasbasso',
  linkedin: 'https://linkedin.com/in/tomasbasso',
  cv: '/CV_Basso_Tomas.pdf',
  foto: '/FotoPersonal.png',
  logo: '/MiLogoPersonal.png',
  frase: 'Construyo soluciones reales de negocio: ERPs, e-commerce y automatizaciones con IA, orientadas a escalabilidad y seguridad.',
}

export const sobreMi = `Desarrollador Full Stack .NET con experiencia en construcción de aplicaciones web empresariales, APIs REST y automatización de procesos con IA. Especializado en ASP.NET Core 8, Entity Framework, autenticación segura (JWT, Identity + 2FA) y frontend moderno con React.

Experiencia implementando soluciones reales de negocio (ERP, e-commerce, automatizaciones con LLMs) orientadas a escalabilidad, seguridad y eficiencia operativa.`

export interface StackGrupo {
  titulo: string
  color: string
  items: string[]
}

export const stack: StackGrupo[] = [
  {
    titulo: 'Backend',
    color: 'var(--neon-violet)',
    items: ['ASP.NET Core 8 (MVC / Web API)', 'Entity Framework Core', 'LINQ', 'JWT Authentication', 'ASP.NET Identity + 2FA', 'Arquitectura en capas'],
  },
  {
    titulo: 'Frontend',
    color: 'var(--neon-cyan)',
    items: ['React.js', 'JavaScript', 'Bootstrap 5', 'AJAX', 'HTML5 / CSS3'],
  },
  {
    titulo: 'Base de datos',
    color: 'var(--neon-magenta)',
    items: ['SQL Server'],
  },
  {
    titulo: 'Automatización & DevOps',
    color: 'var(--neon-cyan)',
    items: ['n8n', 'Docker', 'Webhooks', 'Integración con APIs externas', 'IMAP / Gmail API', 'Bots de Telegram', 'OpenAI / Gemini'],
  },
]

export interface Proyecto {
  id: string
  titulo: string
  descripcion: string
  resultado?: string
  stackItems: string[]
  gradFrom: string
  gradTo: string
  num: string
}

export const proyectos: Proyecto[] = [
  {
    id: 'erp',
    num: '01',
    titulo: 'ERP / Sistema de Inventario – Ferretería',
    descripcion: 'Aplicación web para gestión de productos, ventas y control de stock en tiempo real. Autenticación segura con roles y 2FA. Validación automática de inventario previo a facturación. Arquitectura en capas orientada a mantenimiento y escalabilidad.',
    resultado: 'Digitalización completa del proceso comercial y reducción de errores operativos.',
    stackItems: ['ASP.NET Core 8 (MVC)', 'EF Core', 'Identity + 2FA', 'SQL Server', 'Bootstrap', 'AJAX'],
    gradFrom: '#7C3AED',
    gradTo: '#22D3EE',
  },
  {
    id: 'finanzas',
    num: '02',
    titulo: 'App Móvil de Finanzas Personales',
    descripcion: 'Aplicación multiplataforma conectada a una API REST propia. Autenticación segura mediante JWT. Arquitectura cliente-servidor desacoplada.',
    stackItems: ['.NET MAUI', 'ASP.NET Core API', 'JWT'],
    gradFrom: '#E879F9',
    gradTo: '#7C3AED',
  },
  {
    id: 'ecommerce',
    num: '03',
    titulo: 'E-Commerce – Paz Sport',
    descripcion: 'Plataforma de ventas online con panel administrativo. Gestión dinámica de productos, descuentos y promociones. Consumo de APIs REST y persistencia relacional. Soporte para múltiples sucursales.',
    resultado: 'Centralización de catálogo y automatización de promociones comerciales.',
    stackItems: ['React.js', 'ASP.NET Core Web API', 'SQL Server'],
    gradFrom: '#22D3EE',
    gradTo: '#E879F9',
  },
  {
    id: 'automatizacion',
    num: '04',
    titulo: 'Automatización de Procesos con IA',
    descripcion: 'Workflows automatizados para procesamiento de correos y extracción de datos no estructurados. Integración con bots de Telegram y generación automática de reportes estructurados. Despliegue en contenedores Docker.',
    resultado: 'Reducción significativa de tareas administrativas manuales.',
    stackItems: ['n8n', 'Docker', 'Webhooks', 'IMAP/Gmail API', 'OpenAI / Gemini'],
    gradFrom: '#7C3AED',
    gradTo: '#E879F9',
  },
]

export interface ExperienciaItem {
  rol: string
  empresa: string
  periodo: string
  descripcion: string
}

export const experiencia: ExperienciaItem[] = [
  {
    rol: 'Concejal',
    empresa: 'Municipalidad de Winifreda, La Pampa',
    periodo: '03/2024 – Actualidad',
    descripcion: 'Análisis y gestión de proyectos, negociación con diferentes actores sociales, resolución de conflictos y toma de decisiones estratégicas.',
  },
  {
    rol: 'Gestión Administrativa',
    empresa: 'La Segunda Seguros / Avalián',
    periodo: '01/2017 – Actualidad',
    descripcion: 'Atención directa al cliente, resolución de reclamos bajo presión y optimización de tiempos de respuesta mediante sistemas de gestión.',
  },
]

export interface EducacionItem {
  titulo: string
  institucion: string
  periodo: string
}

export const educacion: EducacionItem[] = [
  {
    titulo: 'Técnico Superior en Desarrollo de Software',
    institucion: 'Instituto Tecnológico de Educación Superior',
    periodo: '03/2022 – 12/2025',
  },
  {
    titulo: 'Técnico en Informática de Gestión',
    institucion: 'Universidad Nacional de La Pampa',
    periodo: '03/2018 – 04/2022',
  },
]

// IDs de sección para navegación anclada
export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto', href: '#contacto' },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: content.ts con todos los datos del portfolio"
```

---

## Task 5: Hooks utilitarios

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useScrollProgress.ts`
- Create: `src/hooks/useActiveSection.ts`

- [ ] **Step 1: Crear useReducedMotion.ts**

```ts
import { useEffect, useState } from 'react'

// Devuelve true si el usuario prefiere reducir el movimiento
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 2: Crear useScrollProgress.ts**

```ts
import { useEffect, useState } from 'react'

// Devuelve el progreso de scroll de 0 a 1
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
```

- [ ] **Step 3: Crear useActiveSection.ts**

```ts
import { useEffect, useState } from 'react'

// Devuelve el id de la sección actualmente visible
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return active
}
```

- [ ] **Step 4: Tests de los hooks**

Crear `src/hooks/__tests__/useReducedMotion.test.ts`:

```ts
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from '../useReducedMotion'

describe('useReducedMotion', () => {
  it('devuelve boolean', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(typeof result.current).toBe('boolean')
  })
})
```

- [ ] **Step 5: Correr tests**

```bash
npm run test -- --run
```
Esperado: 1 test pasando.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/
git commit -m "feat: hooks useReducedMotion, useScrollProgress, useActiveSection"
```

---

## Task 6: ScrollProgress + CustomCursor

**Files:**
- Create: `src/components/ScrollProgress.tsx`
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: Crear ScrollProgress.tsx**

```tsx
import { useScrollProgress } from '../hooks/useScrollProgress'

// Barra de progreso de scroll fija en el top
export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        background: 'var(--grad)',
        transform: `scaleX(${progress})`,
        transition: 'transform 0.1s linear',
      }}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Crear CustomCursor.tsx**

```tsx
import { useEffect, useRef } from 'react'

// Cursor custom tipo dot — solo en dispositivos con puntero fino (desktop)
// No oculta el cursor nativo: fallback visible por accesibilidad
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Solo activar si el device tiene puntero fino
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf: number
    let x = -100, y = -100
    let tx = -100, ty = -100

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      // Suavizado con lerp
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    // Escalar en elementos interactivos
    const onEnter = () => dotRef.current?.classList.add('scale-[3]')
    const onLeave = () => dotRef.current?.classList.remove('scale-[3]')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-150 hidden md:block"
      style={{ background: 'var(--neon-cyan)', opacity: 0.7, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 3: Test de render básico**

Crear `src/components/__tests__/ScrollProgress.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import ScrollProgress from '../ScrollProgress'

describe('ScrollProgress', () => {
  it('renderiza sin errores', () => {
    const { container } = render(<ScrollProgress />)
    expect(container.firstChild).toBeTruthy()
  })
})
```

- [ ] **Step 4: Correr tests**

```bash
npm run test -- --run
```
Esperado: 2 tests pasando.

- [ ] **Step 5: Commit**

```bash
git add src/components/ScrollProgress.tsx src/components/CustomCursor.tsx src/components/__tests__/
git commit -m "feat: ScrollProgress y CustomCursor"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Crear Navbar.tsx**

```tsx
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Navbar fija: blur al scrollear >80px, link activo por sección visible
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  // IDs extraídos de los hrefs: '#sobre-mi' → 'sobre-mi'
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? { backdropFilter: 'blur(16px)', background: 'rgba(10,10,15,0.8)', borderBottom: '1px solid var(--border)' } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="Ir al inicio">
          <img src={personal.logo} alt="Logo TB" className="h-9 w-9 object-contain" />
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  className="font-mono text-sm transition-colors duration-200"
                  style={{ color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)' }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Hamburguesa mobile */}
        <button
          className="md:hidden text-muted"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-sm"
                    style={{ color: 'var(--text-muted)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Test de render**

Crear `src/components/__tests__/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renderiza los links de navegación', () => {
    render(<Navbar />)
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renderiza el logo', () => {
    render(<Navbar />)
    expect(screen.getByAltText('Logo TB')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Correr tests**

```bash
npm run test -- --run
```
Esperado: 3 tests pasando.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/__tests__/Navbar.test.tsx
git commit -m "feat: Navbar con blur, links activos e IntersectionObserver"
```

---

## Task 8: Hero

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Crear Hero.tsx**

```tsx
import { motion } from 'framer-motion'
import { Github, Linkedin, ChevronDown } from 'lucide-react'
import { personal } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Variantes para el stagger del nombre por palabra
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
}

export default function Hero() {
  const reduced = useReducedMotion()
  const palabras = personal.nombre.split(' ')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Glows de fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">

        {/* Columna izquierda — texto */}
        <div className="flex flex-col gap-6 relative z-10">

          {/* Tag */}
          <motion.span
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest uppercase self-start px-3 py-1 rounded border"
            style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(34,211,238,0.3)' }}
          >
            Full Stack .NET · 01
          </motion.span>

          {/* Nombre con stagger */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-grotesk text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {palabras.map((palabra, i) => (
              <motion.span
                key={i}
                variants={reduced ? {} : wordVariants}
                className={`inline-block mr-3 ${i >= 1 ? 'grad-text' : ''}`}
              >
                {palabra}
              </motion.span>
            ))}
          </motion.h1>

          {/* Rol */}
          <motion.p
            variants={fadeUp}
            custom={0.8}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.rol}
          </motion.p>

          {/* Frase */}
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base leading-relaxed max-w-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.frase}
          </motion.p>

          {/* Botones */}
          <motion.div
            variants={fadeUp}
            custom={1.2}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#proyectos"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--grad)' }}
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:border-cyan-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              Contacto
            </a>
            <a
              href={personal.cv}
              download
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:border-cyan-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              ↓ CV
            </a>
          </motion.div>

          {/* Links sociales */}
          <motion.div
            variants={fadeUp}
            custom={1.4}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Tomás Basso"
              className="transition-colors hover:text-cyan-400"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Tomás Basso"
              className="transition-colors hover:text-cyan-400"
              style={{ color: 'var(--text-muted)' }}
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>

        {/* Columna derecha — foto */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center relative"
        >
          {/* Glow radial detrás de la foto */}
          <div className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />

          {/* Ring animado */}
          <motion.div
            animate={reduced ? {} : { scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 p-1 rounded-full"
            style={{ border: '2px solid var(--neon-cyan)', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
          >
            <img
              src={personal.foto}
              alt="Foto de Tomás Basso Fernández"
              width={280}
              height={280}
              loading="eager"
              className="rounded-full object-cover w-64 h-64 md:w-72 md:h-72"
              style={{ filter: 'brightness(1.05) contrast(1.05)' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--text-muted)' }}
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Test de render**

Agregar en `src/components/__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renderiza el nombre', () => {
    render(<Hero />)
    expect(screen.getByText('Tomás')).toBeInTheDocument()
  })

  it('renderiza botón de CV', () => {
    render(<Hero />)
    expect(screen.getByText('↓ CV')).toBeInTheDocument()
  })

  it('link de CV descarga el archivo correcto', () => {
    render(<Hero />)
    const link = screen.getByText('↓ CV').closest('a')
    expect(link).toHaveAttribute('href', '/CV_Basso_Tomas.pdf')
    expect(link).toHaveAttribute('download')
  })
})
```

- [ ] **Step 3: Correr tests**

```bash
npm run test -- --run
```
Esperado: todos los tests pasando.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/__tests__/Hero.test.tsx
git commit -m "feat: Hero con split layout, stagger, foto con glow"
```

---

## Task 9: About

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Crear About.tsx**

```tsx
import { motion } from 'framer-motion'
import { sobreMi } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  const reduced = useReducedMotion()
  const parrafos = sobreMi.split('\n\n')

  return (
    <section id="sobre-mi" className="relative py-24 px-6 overflow-hidden">
      {/* Número de sección decorativo */}
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        02
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Sobre mí
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            ¿Quién soy?
          </h2>
        </motion.div>

        <div className="max-w-3xl flex flex-col gap-5">
          {parrafos.map((p, i) => (
            <motion.p
              key={i}
              variants={reduced ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test**

```tsx
// src/components/__tests__/About.test.tsx
import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About', () => {
  it('renderiza el heading', () => {
    render(<About />)
    expect(screen.getByText('¿Quién soy?')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Correr tests y commit**

```bash
npm run test -- --run
git add src/components/About.tsx src/components/__tests__/About.test.tsx
git commit -m "feat: About con reveal on scroll"
```

---

## Task 10: Stack

**Files:**
- Create: `src/components/Stack.tsx`

- [ ] **Step 1: Crear Stack.tsx**

```tsx
import { motion } from 'framer-motion'
import { stack } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export default function Stack() {
  const reduced = useReducedMotion()

  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        03
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Tecnologías
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Stack tecnológico
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {stack.map((grupo) => (
            <div key={grupo.titulo}>
              <h3
                className="font-mono text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: grupo.color }}
              >
                {grupo.titulo}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {grupo.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={reduced ? {} : tagVariants}
                    whileHover={reduced ? {} : { scale: 1.05, boxShadow: `0 0 12px ${grupo.color}66` }}
                    className="glass px-3 py-1.5 rounded-md text-sm font-mono cursor-default transition-all"
                    style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test**

```tsx
// src/components/__tests__/Stack.test.tsx
import { render, screen } from '@testing-library/react'
import Stack from '../Stack'

describe('Stack', () => {
  it('renderiza todos los grupos', () => {
    render(<Stack />)
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Base de datos')).toBeInTheDocument()
  })

  it('renderiza tecnologías específicas', () => {
    render(<Stack />)
    expect(screen.getByText('ASP.NET Core 8 (MVC / Web API)')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Correr tests y commit**

```bash
npm run test -- --run
git add src/components/Stack.tsx src/components/__tests__/Stack.test.tsx
git commit -m "feat: Stack con grupos, stagger y hover glow"
```

---

## Task 11: Projects

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Crear Projects.tsx**

```tsx
import { motion } from 'framer-motion'
import { proyectos } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section id="proyectos" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        04
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Lo que construí
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Proyectos destacados
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {proyectos.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={reduced ? {} : cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={reduced ? {} : {
                y: -4,
                boxShadow: `0 0 24px rgba(34,211,238,0.2)`,
                borderColor: 'var(--neon-cyan)',
              }}
              className="glass rounded-xl p-6 relative overflow-hidden flex flex-col gap-4 transition-colors"
            >
              {/* Barra de gradiente superior */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${p.gradFrom}, ${p.gradTo})` }}
              />

              {/* Número decorativo */}
              <span
                className="absolute top-4 right-5 font-mono font-bold text-5xl leading-none select-none pointer-events-none"
                style={{ color: 'var(--border)' }}
                aria-hidden="true"
              >
                {p.num}
              </span>

              <h3 className="font-grotesk text-xl font-bold pr-12" style={{ color: 'var(--text)' }}>
                {p.titulo}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                {p.descripcion}
              </p>

              {/* Tags de stack */}
              <div className="flex flex-wrap gap-2">
                {p.stackItems.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{ color: 'var(--neon-cyan)', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Resultado */}
              {p.resultado && (
                <p className="text-sm font-mono italic" style={{ color: 'var(--neon-cyan)' }}>
                  → {p.resultado}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test**

```tsx
// src/components/__tests__/Projects.test.tsx
import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects', () => {
  it('renderiza los 4 proyectos', () => {
    render(<Projects />)
    expect(screen.getByText('ERP / Sistema de Inventario – Ferretería')).toBeInTheDocument()
    expect(screen.getByText('E-Commerce – Paz Sport')).toBeInTheDocument()
  })

  it('muestra el resultado cuando existe', () => {
    render(<Projects />)
    expect(screen.getByText(/Digitalización completa/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Correr tests y commit**

```bash
npm run test -- --run
git add src/components/Projects.tsx src/components/__tests__/Projects.test.tsx
git commit -m "feat: Projects grid 2x2 con cards animadas"
```

---

## Task 12: Experience

**Files:**
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Crear Experience.tsx**

```tsx
import { motion } from 'framer-motion'
import { experiencia } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experiencia" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        05
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Trayectoria
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Experiencia
          </h2>
        </motion.div>

        <div className="relative">
          {/* Línea vertical de gradiente */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] hidden md:block"
            style={{ background: 'var(--grad)' }}
          />

          <div className="flex flex-col gap-10 md:pl-10">
            {experiencia.map((item, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass rounded-xl p-6 relative"
              >
                {/* Dot en la línea */}
                <div
                  className="absolute -left-[2.85rem] top-7 w-3 h-3 rounded-full hidden md:block"
                  style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }}
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-grotesk text-lg font-bold" style={{ color: 'var(--text)' }}>
                      {item.rol}
                    </h3>
                    <p className="font-mono text-sm" style={{ color: 'var(--neon-cyan)' }}>
                      {item.empresa}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs px-2 py-1 rounded self-start whitespace-nowrap"
                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                  >
                    {item.periodo}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test**

```tsx
// src/components/__tests__/Experience.test.tsx
import { render, screen } from '@testing-library/react'
import Experience from '../Experience'

describe('Experience', () => {
  it('renderiza los items de experiencia', () => {
    render(<Experience />)
    expect(screen.getByText('Concejal')).toBeInTheDocument()
    expect(screen.getByText('Gestión Administrativa')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Correr tests y commit**

```bash
npm run test -- --run
git add src/components/Experience.tsx src/components/__tests__/Experience.test.tsx
git commit -m "feat: Experience con timeline vertical animada"
```

---

## Task 13: Education

**Files:**
- Create: `src/components/Education.tsx`

- [ ] **Step 1: Crear Education.tsx**

```tsx
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { educacion } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Education() {
  const reduced = useReducedMotion()

  return (
    <section id="educacion" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        06
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Formación
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Educación
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {educacion.map((item, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-xl p-6 flex gap-4"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <GraduationCap size={20} style={{ color: 'var(--neon-violet)' }} />
              </div>

              <div>
                <h3 className="font-grotesk font-bold mb-1" style={{ color: 'var(--text)' }}>
                  {item.titulo}
                </h3>
                <p className="font-mono text-sm mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  {item.institucion}
                </p>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {item.periodo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test y commit**

```tsx
// src/components/__tests__/Education.test.tsx
import { render, screen } from '@testing-library/react'
import Education from '../Education'

describe('Education', () => {
  it('renderiza los dos items de educación', () => {
    render(<Education />)
    expect(screen.getByText('Técnico Superior en Desarrollo de Software')).toBeInTheDocument()
    expect(screen.getByText('Técnico en Informática de Gestión')).toBeInTheDocument()
  })
})
```

```bash
npm run test -- --run
git add src/components/Education.tsx src/components/__tests__/Education.test.tsx
git commit -m "feat: Education con ícono GraduationCap y reveal on scroll"
```

---

## Task 14: Contact

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Crear Contact.tsx**

```tsx
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react'
import { personal } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const chips = [
  { icon: Mail, label: personal.email, href: `mailto:${personal.email}`, ariaLabel: 'Enviar email a Tomás' },
  { icon: Phone, label: personal.telefono, href: `tel:${personal.telefono}`, ariaLabel: 'Llamar a Tomás' },
  { icon: Github, label: 'github.com/tomasbasso', href: personal.github, ariaLabel: 'GitHub de Tomás Basso' },
  { icon: Linkedin, label: 'linkedin.com/in/tomasbasso', href: personal.linkedin, ariaLabel: 'LinkedIn de Tomás Basso' },
]

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section id="contacto" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        07
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Hablemos
          </span>
          <h2 className="font-grotesk text-5xl font-bold mb-4 grad-text">
            ¿Hablamos?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Estoy disponible para nuevas oportunidades remotas o reubicación. Si tenés un proyecto interesante, escribime.
          </p>
        </motion.div>

        {/* Badges de disponibilidad */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {personal.disponibilidad.map((d) => (
            <span
              key={d}
              className="flex items-center gap-1.5 font-mono text-sm px-4 py-2 rounded-full"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.3)', color: 'var(--neon-cyan)' }}
            >
              <MapPin size={14} />
              {d}
            </span>
          ))}
        </motion.div>

        {/* Chips de contacto */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {chips.map(({ icon: Icon, label, href, ariaLabel }, i) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={ariaLabel}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={reduced ? {} : { scale: 1.02, borderColor: 'var(--neon-cyan)' }}
              className="glass rounded-xl p-4 flex items-center gap-3 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}
              >
                <Icon size={18} style={{ color: 'var(--neon-cyan)' }} />
              </div>
              <span className="font-mono text-sm truncate" style={{ color: 'var(--text)' }}>
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Test y commit**

```tsx
// src/components/__tests__/Contact.test.tsx
import { render, screen } from '@testing-library/react'
import Contact from '../Contact'

describe('Contact', () => {
  it('renderiza el CTA', () => {
    render(<Contact />)
    expect(screen.getByText('¿Hablamos?')).toBeInTheDocument()
  })

  it('renderiza el email', () => {
    render(<Contact />)
    expect(screen.getByText('tomas.basso@hotmail.com')).toBeInTheDocument()
  })

  it('link de email tiene href correcto', () => {
    render(<Contact />)
    const link = screen.getByLabelText('Enviar email a Tomás')
    expect(link).toHaveAttribute('href', 'mailto:tomas.basso@hotmail.com')
  })
})
```

```bash
npm run test -- --run
git add src/components/Contact.tsx src/components/__tests__/Contact.test.tsx
git commit -m "feat: Contact con chips, badges de disponibilidad y CTA"
```

---

## Task 15: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Crear Footer.tsx**

```tsx
import { Github, Linkedin } from 'lucide-react'
import { personal } from '../data/content'

// Año dinámico para no editar manualmente
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-10 px-6 text-center border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
        <img
          src={personal.logo}
          alt="Logo TB"
          className="h-8 w-8 object-contain opacity-70"
        />

        <div className="flex gap-5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Tomás Basso"
            className="transition-colors hover:text-cyan-400"
            style={{ color: 'var(--text-muted)' }}
          >
            <Github size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Tomás Basso"
            className="transition-colors hover:text-cyan-400"
            style={{ color: 'var(--text-muted)' }}
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          © {year} Tomás Basso Fernández
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Test y commit**

```tsx
// src/components/__tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('muestra el año actual en el copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
```

```bash
npm run test -- --run
git add src/components/Footer.tsx src/components/__tests__/Footer.test.tsx
git commit -m "feat: Footer con copyright dinámico y links"
```

---

## Task 16: App.tsx — ensamble + Lenis + GSAP

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Reemplazar App.tsx**

```tsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Registrar plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Inicializar Lenis para smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sincronizar Lenis con ScrollTrigger para evitar desfase en parallax
    lenis.on('scroll', ScrollTrigger.update)

    // Usar el ticker de GSAP como loop de Lenis — NO usar requestAnimationFrame propio
    // Guardar referencia para poder removerla en cleanup
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Parallax suave en los glows de fondo del hero
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set('.hero-glow-top', { y: p * -80 })
        gsap.set('.hero-glow-bottom', { y: p * 60 })
      },
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.killAll()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Agregar clases hero-glow a Hero.tsx**

En `src/components/Hero.tsx`, agregar `hero-glow-top` al primer div de glow y `hero-glow-bottom` al segundo:

```tsx
// Primer glow (top-left):
<div className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none hero-glow-top" .../>

// Segundo glow (bottom-right):
<div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full pointer-events-none hero-glow-bottom" .../>
```

- [ ] **Step 3: Verificar en dev server**

```bash
npm run dev
```
Abrir `http://localhost:5173`. Verificar:
- Smooth scroll al hacer click en links de nav
- Barra de progreso superior se llena al scrollear
- Cursor custom (dot) sigue al mouse en desktop
- Todas las secciones renderizan sin errores en consola

- [ ] **Step 4: Correr todos los tests**

```bash
npm run test -- --run
```
Esperado: todos los tests pasando.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/Hero.tsx
git commit -m "feat: App.tsx con Lenis+GSAP sync, ensamble completo de secciones"
```

---

## Task 17: index.html — SEO y Open Graph

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Reemplazar index.html**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO -->
    <title>Tomás Basso Fernández — Desarrollador Full Stack .NET</title>
    <meta
      name="description"
      content="Portfolio de Tomás Basso Fernández, desarrollador Full Stack .NET especializado en ASP.NET Core 8, React, y automatización con IA. Disponible para trabajo remoto."
    />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Tomás Basso Fernández — Full Stack .NET Developer" />
    <meta
      property="og:description"
      content="Portfolio de desarrollador Full Stack .NET. ERPs, e-commerce y automatizaciones con IA. Disponible para trabajo remoto."
    />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:locale" content="es_AR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Tomás Basso Fernández — Full Stack .NET Developer" />
    <meta name="twitter:image" content="/og-image.png" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/MiLogoPersonal.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: index.html con SEO, Open Graph y favicon"
```

---

## Task 18: Build final + verificación

**Files:** ninguno nuevo

- [ ] **Step 1: Correr todos los tests**

```bash
npm run test -- --run
```
Esperado: todos los tests pasando, 0 fallos.

- [ ] **Step 2: Build de producción**

```bash
npm run build
```
Esperado: sin errores. Carpeta `dist/` generada.

- [ ] **Step 3: Preview del build**

```bash
npm run preview
```
Abrir la URL indicada (normalmente `http://localhost:4173`). Verificar:
- Hero se ve correctamente con foto y layout split
- Smooth scroll funciona al hacer click en links de nav
- En mobile (DevTools → viewport 375px): hero apilado verticalmente, proyectos en 1 columna
- Botón "↓ CV" descarga `CV_Basso_Tomas.pdf`
- Barra de progreso funciona
- No hay errores en consola del browser

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "feat: portfolio SPA completo — build verificado"
```

---

## Instrucciones de ejecución

```bash
# Desarrollo
npm install
npm run dev

# Tests
npm run test

# Build
npm run build
npm run preview
```

## Deploy en Vercel

1. Subir el repositorio a GitHub
2. En [vercel.com](https://vercel.com), importar el repo
3. Framework: **Vite** (detectado automáticamente)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click "Deploy"

Vercel detecta Vite automáticamente — sin configuración adicional necesaria.

---

## Notas post-deploy

- Reemplazar `public/og-image.png` con una imagen real de 1200×630 px (screenshot del hero, por ejemplo) para que el preview al compartir el link se vea bien en redes sociales.
- La URL pública de Vercel se puede agregar al `og:url` en `index.html` una vez deployado.
