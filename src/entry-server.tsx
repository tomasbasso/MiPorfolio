import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Se usa solo en el build: genera el HTML del sitio para que los buscadores lean el contenido sin ejecutar JS
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
