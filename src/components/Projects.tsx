import { motion, type Variants } from 'framer-motion'
import { proyectos } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <section id="proyectos" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        04
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Lo que construí
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Proyectos destacados
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {proyectos.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={reduced ? {} : cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={reduced ? {} : {
                y: -4,
                boxShadow: `0 0 24px rgba(34,211,238,0.2)`,
                borderColor: 'var(--neon-cyan)',
              }}
              className="glass rounded-xl p-6 relative overflow-hidden flex flex-col gap-4 transition-colors"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${p.gradFrom}, ${p.gradTo})` }}
              />

              <span
                className="absolute top-4 right-5 font-mono font-bold text-5xl leading-none select-none pointer-events-none"
                style={{ color: 'var(--border)' }}
                aria-hidden="true"
              >
                {p.num}
              </span>

              <h3 className="font-grotesk text-xl font-bold pr-12" style={{ color: 'var(--text)' }}>
                {p.titulo}
              </h3>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                {p.descripcion}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.stackItems.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{ color: 'var(--neon-cyan)', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {p.resultado && (
                <p className="text-sm font-mono italic" style={{ color: 'var(--neon-cyan)' }}>
                  → {p.resultado}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
