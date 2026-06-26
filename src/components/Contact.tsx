import { motion } from 'framer-motion'
import { Mail, Phone, Globe, ExternalLink, MapPin } from 'lucide-react'
import { personal } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const chips = [
  { icon: Mail, label: personal.email, href: `mailto:${personal.email}`, ariaLabel: 'Enviar email a Tomás' },
  { icon: Phone, label: personal.telefono, href: `tel:${personal.telefono}`, ariaLabel: 'Llamar a Tomás' },
  { icon: Globe, label: 'github.com/tomasbasso', href: personal.github, ariaLabel: 'GitHub de Tomás Basso' },
  { icon: ExternalLink, label: 'linkedin.com/in/tomas-basso', href: personal.linkedin, ariaLabel: 'LinkedIn de Tomás Basso' },
]

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <section id="contacto" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        07
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Hablemos
          </span>
          <h2 className="font-grotesk text-5xl font-bold mb-4 grad-text">
            ¿Hablamos?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Estoy disponible para nuevas oportunidades remotas o reubicación. Si tenés un proyecto interesante, escribime.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {personal.disponibilidad.map((d) => (
            <span
              key={d}
              className="flex items-center gap-1.5 font-mono text-sm px-4 py-2 rounded-full"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.3)', color: 'var(--neon-cyan)' }}
            >
              <MapPin size={14} />
              {d}
            </span>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {chips.map(({ icon: Icon, label, href, ariaLabel }, i) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={ariaLabel}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={reduced ? {} : { scale: 1.02, borderColor: 'var(--neon-cyan)' }}
              className="glass rounded-xl p-4 flex items-center gap-3 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}
              >
                <Icon size={18} style={{ color: 'var(--neon-cyan)' }} />
              </div>
              <span className="font-mono text-sm truncate" style={{ color: 'var(--text)' }}>
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
