import { render, screen } from '@testing-library/react'
import Stack from '../Stack'

describe('Stack', () => {
  it('renderiza todos los grupos', () => {
    render(<Stack />)
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Base de datos')).toBeInTheDocument()
  })

  it('renderiza tecnologías específicas', () => {
    render(<Stack />)
    expect(screen.getByText('ASP.NET Core 8 (MVC / Web API)')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
