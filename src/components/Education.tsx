import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { educacion } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Education() {
  const reduced = useReducedMotion()

  return (
    <section id="educacion" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        06
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Formación
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Educación
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {educacion.map((item, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-xl p-6 flex gap-4"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <GraduationCap size={20} style={{ color: 'var(--neon-violet)' }} />
              </div>

              <div>
                <h3 className="font-grotesk font-bold mb-1" style={{ color: 'var(--text)' }}>
                  {item.titulo}
                </h3>
                <p className="font-mono text-sm mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  {item.institucion}
                </p>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {item.periodo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
