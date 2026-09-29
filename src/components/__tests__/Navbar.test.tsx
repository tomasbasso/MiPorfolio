import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renderiza los links de navegación', () => {
    render(<Navbar />)
    for (const label of ['Sistemas', 'Webs', 'Cómo trabajamos', 'Quién soy', 'Contacto']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('el botón Consultar abre WhatsApp', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /consultar/i })).toHaveAttribute('href', expect.stringMatching(/^https:\/\/wa\.me\/542302524872\?text=/))
  })

  it('el logo lleva al inicio', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /basso tech, ir al inicio/i })).toHaveAttribute('href', '#inicio')
  })
})
