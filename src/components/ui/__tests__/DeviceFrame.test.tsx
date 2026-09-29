import { render, screen } from '@testing-library/react'
import DeviceFrame from '../DeviceFrame'

describe('DeviceFrame', () => {
  it('muestra el dominio en la barra del navegador', () => {
    render(
      <DeviceFrame variant="browser" url="pazsport.vercel.app">
        <p>contenido</p>
      </DeviceFrame>,
    )
    expect(screen.getByText('pazsport.vercel.app')).toBeInTheDocument()
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('muestra el título de la ventana de escritorio', () => {
    render(
      <DeviceFrame variant="desktop" title="Stock y Punto de Venta">
        <p>app</p>
      </DeviceFrame>,
    )
    expect(screen.getByText('Stock y Punto de Venta')).toBeInTheDocument()
  })
})
