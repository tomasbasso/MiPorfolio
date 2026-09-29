import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { pasos } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Reveal from './ui/Reveal'

// La línea que une los pasos se dibuja a medida que se recorre la sección
export default function Proceso() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const progreso = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="como-trabajamos" className="relative overflow-hidden border-t border-line-dark bg-navy pb-28 pt-24 sm:pb-36 sm:pt-28">
      <div className="container-bt">
        <Reveal className="max-w-[40rem]">
          <h2 className="h-display text-[2.1rem] leading-[1.08] text-white sm:text-5xl">Cómo trabajamos</h2>
          <p className="text-pretty mt-5 text-lg leading-relaxed text-mist">
            Un proceso corto y claro, con una sola persona del otro lado de principio a fin.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Línea horizontal (desktop) */}
          <div className="absolute left-[22px] right-[22px] top-[22px] hidden h-px bg-line-dark lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-brand to-brand-soft"
              style={{ scaleX: reduced ? 1 : progreso }}
            />
          </div>
          {/* Línea vertical (mobile) */}
          <div className="absolute bottom-6 left-[22px] top-6 w-px bg-line-dark lg:hidden" aria-hidden="true">
            <motion.div className="h-full w-full origin-top bg-brand" style={{ scaleY: reduced ? 1 : progreso }} />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {pasos.map((p, i) => (
              <li key={p.num} className="relative pl-16 lg:pl-0">
                <Reveal delay={0.1 * i}>
                  <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-brand/50 bg-navy font-display text-sm font-bold text-brand-soft lg:static">
                    {p.num}
                  </span>
                  <h3 className="h-display text-xl text-white lg:mt-7">{p.titulo}</h3>
                  <p className="text-pretty mt-2 leading-relaxed text-mist">{p.descripcion}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
