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
