import { motion } from 'framer-motion'
import { stack } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export default function Stack() {
  const reduced = useReducedMotion()

  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        03
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Tecnologías
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-12" style={{ color: 'var(--text)' }}>
            Stack tecnológico
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {stack.map((grupo) => (
            <div key={grupo.titulo}>
              <h3
                className="font-mono text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: grupo.color }}
              >
                {grupo.titulo}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {grupo.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={reduced ? {} : tagVariants}
                    whileHover={reduced ? {} : { scale: 1.05, boxShadow: `0 0 12px ${grupo.color}66` }}
                    className="glass px-3 py-1.5 rounded-md text-sm font-mono cursor-default transition-all"
                    style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
