import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// El build deja el HTML prerenderizado (sin reduced motion). Si coincide con el cliente se hidrata;
// con reduced motion los estados iniciales de las animaciones difieren, así que se renderiza de cero.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (root.hasChildNodes() && !reduced) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
