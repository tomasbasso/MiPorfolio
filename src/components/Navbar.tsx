import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? { backdropFilter: 'blur(16px)', background: 'rgba(10,10,15,0.8)', borderBottom: '1px solid var(--border)' } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="Ir al inicio">
          <img src={personal.logo} alt="Logo TB" className="h-9 w-9 object-contain" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  className="font-mono text-sm transition-colors duration-200"
                  style={{ color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)' }}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className="md:hidden text-muted"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-mono text-sm"
                    style={{ color: 'var(--text-muted)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
