import { motion } from 'framer-motion'
import { experiencia } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experiencia" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        05
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Trayectoria
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Experiencia
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] hidden md:block"
            style={{ background: 'var(--grad)' }}
          />

          <div className="flex flex-col gap-10 md:pl-10">
            {experiencia.map((item, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass rounded-xl p-6 relative"
              >
                <div
                  className="absolute -left-[2.85rem] top-7 w-3 h-3 rounded-full hidden md:block"
                  style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }}
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-grotesk text-lg font-bold" style={{ color: 'var(--text)' }}>
                      {item.rol}
                    </h3>
                    <p className="font-mono text-sm" style={{ color: 'var(--neon-cyan)' }}>
                      {item.empresa}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs px-2 py-1 rounded self-start whitespace-nowrap"
                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                  >
                    {item.periodo}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
