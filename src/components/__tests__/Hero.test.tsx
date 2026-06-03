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
