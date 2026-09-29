# BASSO TECH — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el portfolio SPA en el sitio comercial de BASSO TECH (productos + webs + contacto por WhatsApp) y publicarlo.

**Architecture:** Mismo proyecto Vite + React + TS + Tailwind 3. Todo el contenido vive en `src/data/content.ts`; el número de WhatsApp y el armado de links viven solo en `src/lib/whatsapp.ts`. Cada sección es un componente en `src/components/`; las pantallas de las apps de escritorio son componentes en `src/components/screens/` que se muestran dentro de `DeviceFrame`.

**Tech Stack:** React 19, TypeScript 6, Tailwind 3.4, framer-motion 12, Lenis 1.3, lucide-react, Vitest 4 + Testing Library, Playwright (solo para capturas), gh-pages.

**Spec:** `docs/superpowers/specs/2026-09-29-basso-tech-design.md`

## Global Constraints

- Idioma: español rioplatense (voseo). Sin precios ni promesas de modalidad de cobro ("pago único", "sin abono", etc.).
- WhatsApp: `542302524872` → `https://wa.me/542302524872?text=<mensaje codificado>`. Email: `tomas.basso@hotmail.com`.
- Paleta: navy `#060912`, navy-2 `#0C1220`, línea oscura `#1A2336`, azul `#0A60FE`, azul claro `#5B95FF`, blanco `#FEFEFE`, claro `#F5F7FB`, tinta `#0B1222`, gris texto claro `#56607A`, gris texto oscuro `#8A94A8`, línea clara `#E3E8F1`, verde WhatsApp `#25D366`.
- Tipos: Sora 600/700 (títulos), Inter 400/500/600 (texto).
- Toda animación respeta `prefers-reduced-motion` (hook `useReducedMotion`).
- Links externos: `target="_blank" rel="noopener noreferrer"`.
- Las pantallas de apps de escritorio usan datos ficticios (nunca datos de clientes).
- Deploy: `npm run deploy` (gh-pages, dominio por `public/CNAME`). Commits en `main` con trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

### Task 1: Datos de marca y link de WhatsApp (TDD)

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/lib/__tests__/whatsapp.test.ts`, `src/data/__tests__/content.test.ts`
- Modify (reescritura completa): `src/data/content.ts`

**Interfaces:**
- Produces:
  - `WHATSAPP_NUMERO: string` y `waLink(mensaje?: string): string`
  - `content.ts` exporta `marca`, `contacto`, `hero`, `productos: Producto[]`, `webs: Web[]`, `servicios: Servicio[]`, `pasos: Paso[]`, `fundador`, `navLinks`, y los tipos `Producto`, `Web`, `Servicio`, `Paso`, `PantallaId`.

- [ ] **Step 1: Tests que fallan**

```ts
// src/lib/__tests__/whatsapp.test.ts
import { waLink, WHATSAPP_NUMERO } from '../whatsapp'

describe('waLink', () => {
  it('sin mensaje devuelve el chat directo', () => {
    expect(waLink()).toBe(`https://wa.me/${WHATSAPP_NUMERO}`)
  })
  it('codifica el mensaje en el query text', () => {
    expect(waLink('Hola, ¿cómo va? 100% stock & ventas')).toBe(
      `https://wa.me/${WHATSAPP_NUMERO}?text=Hola%2C%20%C2%BFc%C3%B3mo%20va%3F%20100%25%20stock%20%26%20ventas`,
    )
  })
  it('usa el número de Tomás en formato internacional', () => {
    expect(WHATSAPP_NUMERO).toBe('542302524872')
  })
})
```

```ts
// src/data/__tests__/content.test.ts
import { productos, webs, pasos, servicios, navLinks } from '../content'

describe('content', () => {
  it('tiene los 4 sistemas de gestión en orden', () => {
    expect(productos.map((p) => p.id)).toEqual(['stock', 'indumentaria', 'turnero', 'kinesio'])
  })
  it('cada producto tiene mensaje de WhatsApp y al menos 5 funciones', () => {
    for (const p of productos) {
      expect(p.mensajeWhatsApp.length).toBeGreaterThan(10)
      expect(p.funciones.length).toBeGreaterThanOrEqual(5)
    }
  })
  it('tiene las 3 webs con url https y captura', () => {
    expect(webs).toHaveLength(3)
    for (const w of webs) {
      expect(w.url).toMatch(/^https:\/\//)
      expect(w.captura).toMatch(/^\/shots\/.+\.(webp|png|jpg)$/)
    }
  })
  it('4 pasos y la IA es el único servicio secundario', () => {
    expect(pasos).toHaveLength(4)
    expect(servicios.filter((s) => s.secundario).map((s) => s.titulo)).toEqual(['Automatizaciones con IA'])
  })
  it('los links de navegación apuntan a anclas', () => {
    for (const l of navLinks) expect(l.href).toMatch(/^#[a-z-]+$/)
  })
  it('no promete modalidad de cobro', () => {
    const texto = JSON.stringify({ productos, servicios, pasos }).toLowerCase()
    for (const prohibido of ['pago único', 'sin abono', 'mensualidad', 'abono mensual']) {
      expect(texto).not.toContain(prohibido)
    }
  })
})
```

- [ ] **Step 2:** `npx vitest run src/lib src/data` → FAIL (módulo inexistente / exports faltantes).
- [ ] **Step 3: Implementación**

```ts
// src/lib/whatsapp.ts
export const WHATSAPP_NUMERO = '542302524872'

export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}
```

`src/data/content.ts`: tipos + datos con el copy definido en el spec (ver contenido final en el archivo). Productos con `id`, `nombre`, `rubro`, `plataforma: 'Escritorio' | 'Web'`, `frase`, `descripcion`, `funciones[]`, `opcional?`, `demo?`, `mensajeWhatsApp`. Webs con `id`, `nombre`, `tipo`, `descripcion`, `url`, `dominio`, `captura`.

- [ ] **Step 4:** `npx vitest run src/lib src/data` → PASS.
- [ ] **Step 5:** Commit `feat: datos de BASSO TECH y helper de WhatsApp`.

### Task 2: Fundaciones de marca (tokens, fuentes, assets, meta)

**Files:**
- Modify: `src/styles/globals.css`, `tailwind.config.ts`, `index.html`, `package.json` (dep `@fontsource/sora`; se quitan `@fontsource/space-grotesk`, `@fontsource/jetbrains-mono`, `gsap`)
- Create: `public/brand/isotipo.png`, `public/brand/imagotipo.png`, `public/brand/logo-animado.svg`, `public/favicon.svg` (monograma sobre cuadrado navy redondeado, paths tomados del SVG animado)

- [ ] **Step 1:** `npm i @fontsource/sora && npm rm @fontsource/space-grotesk @fontsource/jetbrains-mono gsap`
- [ ] **Step 2:** `globals.css`: imports Sora 600/700 + Inter 400/500/600; variables CSS de la paleta global; `body` navy; utilidades `.section-dark`, `.section-light`, `.section-light-alt`, `.glow-blue`, `.text-balance`; bloque reduced-motion existente. Quitar grilla neón, `.grad-text`, `.glass` neón.
- [ ] **Step 3:** `tailwind.config.ts`: colores `navy`, `navy-2`, `line-dark`, `brand`, `brand-soft`, `paper`, `paper-2`, `ink`, `ink-soft`, `mist`, `line-light`, `wa`; fuentes `display: Sora`, `sans: Inter`.
- [ ] **Step 4:** `index.html`: `<title>BASSO TECH — Sistemas de gestión y páginas web</title>`, description, OG/Twitter, `theme-color #060912`, favicon SVG + PNG fallback, JSON-LD `ProfessionalService` (nombre, url `https://tomasbasso.com.ar`, founder, areaServed AR, telephone, email).
- [ ] **Step 5:** `npm run build` → OK. Commit `feat: identidad BASSO TECH (tokens, fuentes, favicon, meta)`.

### Task 3: Capturas reales de los sitios en vivo

**Files:**
- Create: `scripts/capturas.mjs`, `public/shots/turnero.webp`, `public/shots/turnero-mobile.webp`, `public/shots/pazsport.webp`, `public/shots/cira.webp`, `public/shots/winifreda.webp`

- [ ] **Step 1:** Script Playwright (Chromium headless) que abre cada URL a 1440×900 (y 390×844 para `turnero-mobile`), espera `networkidle` + 1,5 s, cierra banners si existen, y guarda PNG viewport en el scratchpad.
- [ ] **Step 2:** Convertir a WebP (calidad 82, ancho 1440 / 780) con `sharp` vía `npx`, guardar en `public/shots/`.
- [ ] **Step 3:** Revisar cada imagen a ojo (que no haya datos personales ni popups). Commit `feat: capturas de sitios en producción`.

### Task 4: Primitivas de UI

**Files:**
- Create: `src/components/ui/DeviceFrame.tsx`, `src/components/ui/Reveal.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/WhatsAppButton.tsx`, `src/components/ui/WhatsAppIcon.tsx`, `src/hooks/useLoop.ts`, tests en `src/components/ui/__tests__/`

**Interfaces:**
- `DeviceFrame({ variant: 'desktop' | 'browser' | 'phone', title?: string, url?: string, className?: string, children })`
- `Reveal({ children, delay?: number, y?: number, className?: string, as?: 'div' | 'li' })` — fade + subida al entrar en viewport, estático con reduced motion.
- `SectionHeading({ eyebrow, title, subtitle?, tone: 'dark' | 'light', align?: 'left' | 'center' })`
- `WhatsAppButton({ mensaje?: string, children, variant?: 'primary' | 'light' | 'outline', size?: 'md' | 'lg', className? })` — `<a href={waLink(mensaje)} target="_blank" rel="noopener noreferrer">`
- `useLoop(steps: number, intervalMs: number, active: boolean): number` — índice que avanza en bucle mientras `active`.

- [ ] **Step 1: Tests que fallan**

```tsx
// src/components/ui/__tests__/WhatsAppButton.test.tsx
import { render, screen } from '@testing-library/react'
import WhatsAppButton from '../WhatsAppButton'

it('abre WhatsApp con el mensaje en pestaña nueva', () => {
  render(<WhatsAppButton mensaje="Hola">Escribime</WhatsAppButton>)
  const link = screen.getByRole('link', { name: /escribime/i })
  expect(link).toHaveAttribute('href', 'https://wa.me/542302524872?text=Hola')
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noopener noreferrer')
})
```

```tsx
// src/components/ui/__tests__/DeviceFrame.test.tsx
import { render, screen } from '@testing-library/react'
import DeviceFrame from '../DeviceFrame'

it('muestra el dominio en la barra del navegador', () => {
  render(<DeviceFrame variant="browser" url="pazsport.vercel.app"><p>contenido</p></DeviceFrame>)
  expect(screen.getByText('pazsport.vercel.app')).toBeInTheDocument()
  expect(screen.getByText('contenido')).toBeInTheDocument()
})
```

```ts
// src/hooks/__tests__/useLoop.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLoop } from '../useLoop'

it('avanza y vuelve a 0 solo mientras está activo', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ a }) => useLoop(3, 100, a), { initialProps: { a: true } })
  expect(result.current).toBe(0)
  act(() => vi.advanceTimersByTime(100)); expect(result.current).toBe(1)
  act(() => vi.advanceTimersByTime(200)); expect(result.current).toBe(0)
  rerender({ a: false })
  act(() => vi.advanceTimersByTime(500)); expect(result.current).toBe(0)
  vi.useRealTimers()
})
```

- [ ] **Step 2:** correr → FAIL. **Step 3:** implementar. **Step 4:** correr → PASS. **Step 5:** commit `feat: primitivas de UI (DeviceFrame, Reveal, WhatsAppButton, useLoop)`.

### Task 5: Pantallas recreadas de las apps de escritorio

**Files:**
- Create: `src/components/screens/StockScreen.tsx`, `IndumentariaScreen.tsx`, `KinesioScreen.tsx`, `src/components/screens/__tests__/screens.test.tsx`

Cada pantalla: `({ animate?: boolean })`, se ve dentro de `DeviceFrame variant="desktop"`, usa la paleta de su app, datos ficticios, `aria-hidden` en la decoración y un `role="img"` + `aria-label` descriptivo en el contenedor. Animación con `useLoop` + `useInView` (framer-motion) y `useReducedMotion`.
- **Stock:** sidebar slate `#1E293B` (Inicio, Punto de venta activo, Productos, Clientes, Caja, Reportes); ticket que suma ítems de a uno (yerba, azúcar, aceite, galletitas) y total que se actualiza; chip "Factura C · ARCA"; al completar, aviso "Venta registrada".
- **Indumentaria:** carbón `#1A1A1A` + bronce `#9A7B4F`, fondo hueso `#FAF9F7`; ficha "Buzo oversize frisa", grilla talles (S–XL) × colores (Negro, Gris topo, Arena) con stock; una celda se resalta y baja 1 en cada paso; stock ≤ 2 en bronce.
- **Kinesio:** coral `#DF6B59`; agenda semanal Lun–Vie 8–12 h; turnos que aparecen en secuencia con colores por estado (programado `#4F86C6`, atendido `#22C55E`, ausente `#F59E0B`); panel "Tratamiento · Sesión 4 de 10".

- [ ] **Step 1: Test que falla**

```tsx
// src/components/screens/__tests__/screens.test.tsx
import { render, screen } from '@testing-library/react'
import StockScreen from '../StockScreen'
import IndumentariaScreen from '../IndumentariaScreen'
import KinesioScreen from '../KinesioScreen'

it.each([
  [StockScreen, /punto de venta/i],
  [IndumentariaScreen, /talles y colores/i],
  [KinesioScreen, /agenda/i],
])('%o expone una descripción accesible', (Comp, label) => {
  render(<Comp animate={false} />)
  expect(screen.getByRole('img', { name: label })).toBeInTheDocument()
})
```

- [ ] **Step 2–4:** FAIL → implementar → PASS. **Step 5:** commit `feat: pantallas recreadas de Stock, Indumentaria y Kinesiología`.

### Task 6: Navbar + Hero + marquesina de rubros

**Files:**
- Modify (reescritura): `src/components/Navbar.tsx`, `src/components/Hero.tsx`, tests
- Create: `src/components/Rubros.tsx`

- Navbar: isotipo + "BASSO **TECH**", links de `navLinks`, botón "Hablemos" (`WhatsAppButton` sin mensaje), menú mobile animado; fondo navy translúcido con blur al scrollear.
- Hero (`id="inicio"`): logo animado (`/brand/logo-animado.svg`, `<img>` con alt "BASSO TECH"), eyebrow, h1 con "comercios y consultorios" en azul, subtítulo, CTAs (WhatsApp con mensaje general + "Ver sistemas" → `#sistemas`). Arte: `DeviceFrame desktop` con `StockScreen` + `DeviceFrame phone` con `turnero-mobile.webp`; parallax suave con el mouse (solo pointer fine, sin reduced motion); brillo azul de fondo.
- Rubros: franja con los rubros en marquesina lenta (duplicada para bucle), estática con reduced motion.

- [ ] Tests: Navbar renderiza links y el botón "Hablemos" apunta a wa.me; Hero tiene h1 con "comercios y consultorios", CTA a wa.me y link a `#sistemas`.
- [ ] Commit `feat: navbar, hero y marquesina de rubros`.

### Task 7: Sistemas (zigzag) + Webs

**Files:**
- Create: `src/components/Productos.tsx`, `src/components/ProductoFila.tsx`, `src/components/Webs.tsx`, tests

- `Productos` (`id="sistemas"`, sección clara): `SectionHeading` + `productos.map((p, i) => <ProductoFila producto={p} invertido={i % 2 === 1} />)`.
- `ProductoFila`: etiquetas rubro/plataforma, h3, frase, descripción, lista de funciones con check, fila "opcional" destacada si existe, CTA `WhatsAppButton mensaje={p.mensajeWhatsApp}` + link "Ver demo" si `demo`. Pantalla: `stock|indumentaria|kinesio` → componente de `screens`; `turnero` → `DeviceFrame browser` con `turnero.webp`.
- `Webs` (`id="webs"`, sección clara alternativa): 3 tarjetas con `DeviceFrame browser` + captura (`loading="lazy"`), tipo, nombre, descripción, "Visitar sitio ↗". Hover: la captura se desplaza (scroll interno) suavemente.

- [ ] Tests: 4 `h3` de productos; cada CTA de producto con `text=` codificado de su mensaje; 3 links externos de webs con `rel="noopener noreferrer"`.
- [ ] Commit `feat: secciones de sistemas y webs`.

### Task 8: Servicios, Proceso, Fundador, Cierre, Footer, botón flotante

**Files:**
- Create: `src/components/Servicios.tsx`, `Proceso.tsx`, `Fundador.tsx`, `Cierre.tsx`, `WhatsAppFlotante.tsx`; Modify: `src/components/Footer.tsx`; tests

- Servicios (`id="a-medida"`, oscuro): grilla de 4; la de IA más discreta (sin ícono destacado, texto más chico).
- Proceso (`id="como-trabajamos"`, oscuro): 4 pasos; línea que se dibuja con el scroll (`useScroll` + `scaleX`/`scaleY`).
- Fundador (`id="quien-soy"`, claro): foto `/FotoPersonal.png`, nombre, rol, bio, datos.
- Cierre (`id="contacto"`, oscuro con brillo): título, WhatsApp grande, email (`mailto:`), ubicación; isotipo grande de fondo.
- Footer: imagotipo, © año dinámico, links.
- WhatsAppFlotante: visible cuando `scrollY > innerHeight * 0.8`; `aria-label="Escribir por WhatsApp"`.

- [ ] Tests: IA marcada como secundaria; 4 pasos numerados; Cierre con `mailto:tomas.basso@hotmail.com`; flotante oculto al inicio (`scrollY = 0`) y visible tras evento scroll con `scrollY` grande.
- [ ] Commit `feat: servicios, proceso, fundador, cierre y botón flotante`.

### Task 9: Ensamble y limpieza

**Files:**
- Modify: `src/App.tsx`; Delete: `About`, `Stack`, `Projects`, `Experience`, `Education`, `Contact`, `CustomCursor`, `ScrollProgress` (+ tests), `src/hooks/useScrollProgress.ts`, `public/MiLogoPersonal.png`, `public/CV_Basso_Tomas.pdf`, `public/icons.svg` si no se usan; Create: `public/og-image.png` (1200×630, generada con Playwright desde HTML de marca).
- App: Lenis con `anchors: { offset: -72 }`, RAF propio; orden: Navbar, Hero, Rubros, Productos, Webs, Servicios, Proceso, Fundador, Cierre, Footer, WhatsAppFlotante.

- [ ] `npm test -- --run`, `npm run lint`, `npm run build` → todo verde. Commit `feat: ensamble del sitio BASSO TECH`.

### Task 10: Verificación visual y publicación

- [ ] Levantar `npm run dev` (preview), revisar desktop 1440 y mobile 375: sin scroll horizontal, contraste, animaciones, links. Corregir lo que aparezca (commits `fix:`).
- [ ] `git push origin main` y `npm run deploy`. Verificar `https://tomasbasso.com.ar` responde con el título nuevo.
