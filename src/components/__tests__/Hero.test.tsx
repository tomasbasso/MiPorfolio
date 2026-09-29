import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('muestra el titular con el público objetivo', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/sistemas de gestión para comercios y consultorios/i)
  })

  it('tiene el CTA de WhatsApp y el link a los sistemas', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /consultar por whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me/542302524872'))
    expect(screen.getByRole('link', { name: /ver sistemas/i })).toHaveAttribute('href', '#sistemas')
  })

  it('muestra el logo animado con texto alternativo', () => {
    render(<Hero />)
    expect(screen.getByAltText('BASSO TECH')).toHaveAttribute('src', '/brand/logo-animado.svg')
  })
})
