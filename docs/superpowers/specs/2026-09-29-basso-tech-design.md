# BASSO TECH — Rediseño del sitio (portfolio → sitio comercial)

**Fecha:** 2026-09-29
**Estado:** aprobado por Tomás en brainstorming (estructura, estilo mixto, zigzag, hero B). Tomás delegó animaciones y detalles finos, y pidió publicar en `main` + GitHub Pages al terminar.

## Objetivo

Convertir `tomasbasso.com.ar` (hoy portfolio para reclutadores) en el sitio de **BASSO TECH**, la marca con la que Tomás Basso Fernández ofrece sistemas de gestión y páginas web. Público: comercios, consultorios y PyMEs de Argentina. Tono cercano, en voseo. Conversión principal: **mensaje de WhatsApp**.

## Decisiones cerradas

| Tema | Decisión |
|---|---|
| Dominio | Reemplaza el portfolio (un solo sitio, mismo repo, mismo deploy a GitHub Pages) |
| Oferta | Productos listos para adaptar + desarrollo a medida |
| Contacto | WhatsApp +54 2302 524872 (mensajes prearmados por producto) + botón flotante. Email secundario: tomas.basso@hotmail.com |
| Precios | No se muestran. "Consultá tu presupuesto" |
| Modelo de cobro | No definido → los textos no prometen pago único ni abono |
| Enfoque técnico | Rebrand sobre el SPA Vite + React + TS existente, una sola página |
| Estilo | **Mixto**: hero, franja de servicios/proceso y cierre en oscuro; productos, webs y "quién está detrás" en claro |
| Paleta | Navy `#060912`, superficie oscura `#0C1220`, azul marca `#0A60FE`, blanco `#FEFEFE`, claro `#F5F7FB` / `#FFFFFF`, tinta `#0B1222` |
| Tipografía | Sora (títulos) + Inter (textos). Inter confirmada por Tomás |
| Presentación de productos | Filas alternadas (zigzag) |
| Hero | Dividido: logo animado + titular + CTAs a la izquierda, capturas (escritorio + celular) a la derecha |
| Automatizaciones IA | Sí, como servicio secundario dentro de "a medida" |

## Estructura de la página

1. **Navbar** (oscuro translúcido, fijo): isotipo + wordmark, links (Sistemas · Webs · Cómo trabajamos · Quién soy · Contacto), botón "Hablemos" → WhatsApp. Menú hamburguesa en mobile.
2. **Hero** (oscuro): `basso-tech-logo-animado.svg`, eyebrow, titular, subtítulo, CTA WhatsApp + "Ver sistemas". A la derecha, composición de pantallas.
3. **Sistemas de gestión** (claro) — 4 filas zigzag:
   - **Stock y Punto de Venta** · Comercios · Escritorio · módulo opcional de factura electrónica ARCA (ex AFIP). Unifica las dos versiones existentes.
   - **Stock para Indumentaria** · Tiendas de ropa · Escritorio · variantes talle × color con stock y código propio.
   - **Turnero online** · Consultorios · Web · en producción (link a la demo pública).
   - **Agenda para Kinesiología** · Kinesiólogos / centros de rehabilitación · Escritorio · tratamientos por sesiones, historia clínica, cobros.
   Cada fila: etiquetas (rubro + plataforma), nombre, frase, 5–6 funciones, pantalla, CTA WhatsApp con mensaje específico.
4. **Páginas web** (claro, tono alternativo): PazSport (tienda online), Cira Impresiones (web + panel admin), Municipalidad de Winifreda (sitio institucional). Captura real en marco de navegador + link.
5. **Soluciones a medida** (oscuro): sistemas a medida · webs y tiendas online · implementación, capacitación y soporte · automatizaciones con IA (más discreta).
6. **Cómo trabajamos** (oscuro, continúa): 4 pasos — Charlamos · Propuesta · Implementación · Soporte.
7. **Quién está detrás** (claro): foto, "Tomás Basso Fernández — fundador", Técnico Superior en Desarrollo de Software, Winifreda (La Pampa), "hablás directo con quien desarrolla tu sistema".
8. **Cierre + contacto** (oscuro con brillo): "¿Hablamos de tu negocio?", WhatsApp grande, email, ubicación.
9. **Footer** (oscuro): imagotipo, © año, links.
10. **Botón flotante WhatsApp**: aparece al pasar el hero.

Se eliminan: Stack, Experiencia, Educación, CV, cursor personalizado, barra de progreso, grilla neón de fondo.

## Pantallas de los productos

- **Webs en vivo** (Turnero, PazSport, Cira, Municipalidad): capturas reales tomadas con navegador headless del sitio público, en WebP, sin páginas con login.
- **Apps de escritorio** (Stock, Indumentaria, Kinesiología): se ven como **pantallas recreadas en código** (HTML/CSS dentro del sitio), fieles al layout y paleta de cada app (Stock: slate `#1E293B`; Indumentaria: carbón `#1A1A1A` + bronce `#9A7B4F`; Kinesio: coral `#DF6B59` + colores por estado del turno) y **con datos ficticios**. Motivo: la captura de WebView2 sale en negro y las bases locales tienen datos reales de clientes que no deben publicarse. Ventaja extra: se pueden animar (venta que se arma, turnos que aparecen).
- Todas las pantallas se enmarcan en un componente `DeviceFrame` (ventana de escritorio o navegador) para que se lean como producto.

## Animación (criterio propio, delegado)

- Logo SVG animado en el hero (propio del archivo, respeta `prefers-reduced-motion`).
- Entradas por scroll con framer-motion (fade + desplazamiento corto, stagger en listas).
- Pantallas recreadas con microanimaciones en bucle suave: ítems que entran al ticket del POS y total que sube; grilla de talles que se completa; turnos que aparecen en la agenda. Pausadas fuera de pantalla y desactivadas con reduced motion.
- Hero: leve parallax de las pantallas al mover el mouse (solo desktop) y brillo azul de fondo.
- Nada de cursor custom ni efectos que tapen el contenido.

## Arquitectura

- `src/data/content.ts` → reemplazado por datos de BASSO TECH: `marca`, `contacto`, `productos`, `webs`, `servicios`, `pasos`, `fundador`, `navLinks`.
- `src/lib/whatsapp.ts` → `waLink(mensaje?)` arma `https://wa.me/542302524872?text=...` (encodeURIComponent). Único lugar con el número.
- Componentes nuevos: `Hero`, `Productos` + `ProductoFila`, `Webs`, `Servicios`, `Proceso`, `Fundador`, `Cierre`, `WhatsAppFlotante`, `DeviceFrame`, `screens/StockScreen`, `screens/IndumentariaScreen`, `screens/KinesioScreen`.
- Se reescriben `Navbar`, `Footer`. Se borran `About`, `Stack`, `Projects`, `Experience`, `Education`, `Contact`, `CustomCursor`, `ScrollProgress` y sus tests.
- Estilos: tokens nuevos en `globals.css` + `tailwind.config.ts`; fuentes vía `@fontsource/sora` y `@fontsource/inter`.
- Assets: `public/brand/` (isotipo, imagotipo, logo animado), `public/shots/` (capturas WebP), `public/og-image.png` regenerada con la marca.
- `index.html`: título, description, OG/Twitter y favicon de BASSO TECH; JSON-LD `ProfessionalService` con zona Argentina.

## Testing

- Unit: `waLink` (encoding, número), datos (4 productos, 3 webs, cada uno con mensaje de WhatsApp).
- Componentes (Vitest + Testing Library): cada sección renderiza sus títulos; todos los CTA apuntan a `wa.me`; links externos con `target="_blank" rel="noopener"`; botón flotante oculto al inicio.
- Verificación manual en navegador: desktop 1440 y mobile 375, sin scroll horizontal, contraste legible en secciones claras y oscuras.
- `npm run build` y `npm run lint` limpios antes de publicar.

## Fuera de alcance

Páginas individuales por producto, formulario de contacto, precios, blog, analytics, multi-idioma.
