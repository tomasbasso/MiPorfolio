import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About', () => {
  it('renderiza el heading', () => {
    render(<About />)
    expect(screen.getByText('¿Quién soy?')).toBeInTheDocument()
  })
})
