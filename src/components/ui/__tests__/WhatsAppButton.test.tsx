import { render, screen } from '@testing-library/react'
import WhatsAppButton from '../WhatsAppButton'

describe('WhatsAppButton', () => {
  it('abre WhatsApp con el mensaje en pestaña nueva', () => {
    render(<WhatsAppButton mensaje="Hola">Escribime</WhatsAppButton>)
    const link = screen.getByRole('link', { name: /escribime/i })
    expect(link).toHaveAttribute('href', 'https://wa.me/542302524872?text=Hola')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('sin mensaje abre el chat directo', () => {
    render(<WhatsAppButton>Consultar</WhatsAppButton>)
    expect(screen.getByRole('link', { name: /consultar/i })).toHaveAttribute('href', 'https://wa.me/542302524872')
  })
})
