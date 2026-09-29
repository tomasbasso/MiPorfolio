import { render, screen, within } from '@testing-library/react'
import Productos from '../Productos'
import Webs from '../Webs'
import Servicios from '../Servicios'
import Proceso from '../Proceso'
import Cierre from '../Cierre'
import WhatsAppFlotante from '../WhatsAppFlotante'
import { productos, webs } from '../../data/content'

describe('Productos', () => {
  it('muestra los 4 sistemas', () => {
    render(<Productos />)
    for (const p of productos) {
      expect(screen.getByRole('heading', { level: 3, name: p.nombre })).toBeInTheDocument()
    }
  })

  it('cada sistema consulta por WhatsApp con su propio mensaje', () => {
    render(<Productos />)
    for (const p of productos) {
      const fila = screen.getByRole('article', { name: p.nombre })
      const cta = within(fila).getByRole('link', { name: /consultar por whatsapp/i })
      expect(cta).toHaveAttribute('href', `https://wa.me/542302524872?text=${encodeURIComponent(p.mensajeWhatsApp)}`)
    }
  })

  it('aclara que las pantallas usan datos ficticios', () => {
    render(<Productos />)
    expect(screen.getAllByText(/datos ficticios/i)).toHaveLength(productos.length)
  })
})

describe('Webs', () => {
  it('enlaza a las 3 webs en pestaña nueva', () => {
    render(<Webs />)
    for (const w of webs) {
      const link = screen.getByRole('link', { name: new RegExp(w.nombre) })
      expect(link).toHaveAttribute('href', w.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

describe('Servicios', () => {
  it('muestra la IA como servicio secundario, sin tarjeta propia', () => {
    render(<Servicios />)
    expect(screen.getByRole('heading', { level: 3, name: 'Sistemas a medida' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /automatizaciones con ia/i })).not.toBeInTheDocument()
    expect(screen.getByText(/automatizaciones con ia/i)).toBeInTheDocument()
  })
})

describe('Proceso', () => {
  it('lista los 4 pasos en orden', () => {
    render(<Proceso />)
    const pasos = within(screen.getByRole('list')).getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(pasos).toEqual(['Charlamos', 'Propuesta', 'Implementación', 'Soporte'])
  })
})

describe('Cierre', () => {
  it('ofrece WhatsApp y email', () => {
    render(<Cierre />)
    expect(screen.getByRole('link', { name: /consultar por whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(screen.getByRole('link', { name: 'tomas.basso@hotmail.com' })).toHaveAttribute('href', 'mailto:tomas.basso@hotmail.com')
  })
})

describe('WhatsAppFlotante', () => {
  it('no aparece mientras se está en el hero', () => {
    render(<WhatsAppFlotante />)
    expect(screen.queryByRole('link', { name: /consultar por whatsapp/i })).not.toBeInTheDocument()
  })
})
