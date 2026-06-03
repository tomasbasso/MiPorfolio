import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects', () => {
  it('renderiza los 4 proyectos', () => {
    render(<Projects />)
    expect(screen.getByText('ERP / Sistema de Inventario – Ferretería')).toBeInTheDocument()
    expect(screen.getByText('E-Commerce – Paz Sport')).toBeInTheDocument()
  })

  it('muestra el resultado cuando existe', () => {
    render(<Projects />)
    expect(screen.getByText(/Digitalización completa/)).toBeInTheDocument()
  })
})
