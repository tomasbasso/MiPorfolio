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
