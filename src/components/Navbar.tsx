import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { contacto, marca, navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useReducedMotion } from '../hooks/useReducedMotion'
import WhatsAppButton from './ui/WhatsAppButton'

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-[0.16em] ${className}`}>
      BASSO <span className="text-brand">TECH</span>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    if (next !== scrolled) setScrolled(next)
  })

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-b border-line-dark bg-navy/95 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-bt flex h-[68px] items-center justify-between gap-6" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label={`${marca.nombre}, ir al inicio`}>
          <img src="/brand/isotipo.svg" alt="" className="h-8 w-auto" width={29} height={32} />
          <Wordmark className="text-[15px] text-white" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map(({ label, href }) => {
            const isActive = active === href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-[14px] font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/65 hover:text-white'}`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-[23px] left-0 right-0 h-[2px] rounded-full bg-brand"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <WhatsAppButton mensaje={contacto.mensajeGeneral} className="hidden sm:inline-flex">
            Consultar
          </WhatsAppButton>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 hover:bg-white/5 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line-dark lg:hidden"
          >
            <ul className="container-bt flex flex-col py-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block py-3 font-display text-lg font-semibold text-white/85"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pb-3 pt-2">
                <WhatsAppButton mensaje={contacto.mensajeGeneral} className="w-full">
                  Consultar por WhatsApp
                </WhatsAppButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
