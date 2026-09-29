import { useEffect } from 'react'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Rubros from './components/Rubros'
import Productos from './components/Productos'
import Webs from './components/Webs'
import Servicios from './components/Servicios'
import Proceso from './components/Proceso'
import Fundador from './components/Fundador'
import Cierre from './components/Cierre'
import Footer from './components/Footer'
import WhatsAppFlotante from './components/WhatsAppFlotante'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true, // respeta el scroll-margin-top de las secciones
    })

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <a
        href="#sistemas"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Rubros />
        <Productos />
        <Webs />
        <Servicios />
        <Proceso />
        <Fundador />
        <Cierre />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  )
}
