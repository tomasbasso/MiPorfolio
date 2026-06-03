import { render, screen } from '@testing-library/react'
import Experience from '../Experience'

describe('Experience', () => {
  it('renderiza los items de experiencia', () => {
    render(<Experience />)
    expect(screen.getByText('Concejal')).toBeInTheDocument()
    expect(screen.getByText('Gestión Administrativa')).toBeInTheDocument()
  })
})
