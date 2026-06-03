import { motion, type Variants } from 'framer-motion'
import { sobreMi } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  const reduced = useReducedMotion()
  const parrafos = sobreMi.split('\n\n')

  return (
    <section id="sobre-mi" className="relative py-24 px-6 overflow-hidden">
      <span
        className="absolute top-12 right-6 font-mono font-bold text-[8rem] leading-none select-none pointer-events-none hidden md:block"
        style={{ color: 'var(--border)' }}
        aria-hidden="true"
      >
        02
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--neon-cyan)' }}>
            // Sobre mí
          </span>
          <h2 className="font-grotesk text-4xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            ¿Quién soy?
          </h2>
        </motion.div>

        <div className="max-w-3xl flex flex-col gap-5">
          {parrafos.map((p, i) => (
            <motion.p
              key={i}
              variants={reduced ? {} : fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
