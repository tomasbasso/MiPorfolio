import { render, screen } from '@testing-library/react'
import type { ComponentType } from 'react'
import StockScreen from '../StockScreen'
import IndumentariaScreen from '../IndumentariaScreen'
import KinesioScreen from '../KinesioScreen'
import TurneroScreen from '../TurneroScreen'

const casos: [string, ComponentType<{ animate?: boolean }>, RegExp][] = [
  ['Stock', StockScreen, /punto de venta/i],
  ['Indumentaria', IndumentariaScreen, /talles y colores/i],
  ['Kinesiología', KinesioScreen, /agenda/i],
  ['Turnero', TurneroScreen, /reserva de turnos/i],
]

describe('pantallas recreadas', () => {
  it.each(casos)('%s expone una descripción accesible', (_nombre, Comp, label) => {
    render(<Comp animate={false} />)
    expect(screen.getByRole('img', { name: label })).toBeInTheDocument()
  })

  it('el turnero compacto también se describe', () => {
    render(<TurneroScreen animate={false} compact />)
    expect(screen.getByRole('img', { name: /reserva de turnos/i })).toBeInTheDocument()
  })
})
