import { motion, type Variants } from 'framer-motion'
import { Globe, ExternalLink, ChevronDown } from 'lucide-react'
import { personal } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
}

export default function Hero() {
  const reduced = useReducedMotion()
  const palabras = personal.nombre.split(' ')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none hero-glow-top"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full pointer-events-none hero-glow-bottom"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">

        <div className="flex flex-col gap-6 relative z-10">

          <motion.span
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs tracking-widest uppercase self-start px-3 py-1 rounded border"
            style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(34,211,238,0.3)' }}
          >
            Full Stack .NET · 01
          </motion.span>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-grotesk text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {palabras.map((palabra, i) => (
              <motion.span
                key={i}
                variants={reduced ? {} : wordVariants}
                className={`inline-block mr-3 ${i >= 1 ? 'grad-text' : ''}`}
              >
                {palabra}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.8}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.rol}
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="text-base leading-relaxed max-w-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            {personal.frase}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={1.2}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#proyectos"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--grad)' }}
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:border-cyan-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              Contacto
            </a>
            <a
              href={personal.cv}
              download
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:border-cyan-400"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              ↓ CV
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1.4}
            initial="hidden"
            animate={reduced ? 'visible' : undefined}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Tomás Basso"
              className="transition-colors hover:text-cyan-400"
              style={{ color: 'var(--text-muted)' }}
            >
              <Globe size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Tomás Basso"
              className="transition-colors hover:text-cyan-400"
              style={{ color: 'var(--text-muted)' }}
            >
              <ExternalLink size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center relative"
        >
          <div className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />

          <motion.div
            animate={reduced ? {} : { scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 p-1 rounded-full"
            style={{ border: '2px solid var(--neon-cyan)', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
          >
            <img
              src={personal.foto}
              alt="Foto de Tomás Basso Fernández"
              width={280}
              height={280}
              loading="eager"
              className="rounded-full object-cover w-64 h-64 md:w-72 md:h-72"
              style={{ filter: 'brightness(1.05) contrast(1.05)' }}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--text-muted)' }}
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
