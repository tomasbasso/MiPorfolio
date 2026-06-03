import { render, screen } from '@testing-library/react'
import Education from '../Education'

describe('Education', () => {
  it('renderiza los dos items de educación', () => {
    render(<Education />)
    expect(screen.getByText('Técnico Superior en Desarrollo de Software')).toBeInTheDocument()
    expect(screen.getByText('Técnico en Informática de Gestión')).toBeInTheDocument()
  })
})
