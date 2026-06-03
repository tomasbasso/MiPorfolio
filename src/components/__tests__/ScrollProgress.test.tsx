import { render } from '@testing-library/react'
import ScrollProgress from '../ScrollProgress'

describe('ScrollProgress', () => {
  it('renderiza sin errores', () => {
    const { container } = render(<ScrollProgress />)
    expect(container.firstChild).toBeTruthy()
  })
})
