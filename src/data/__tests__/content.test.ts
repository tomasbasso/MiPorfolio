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
