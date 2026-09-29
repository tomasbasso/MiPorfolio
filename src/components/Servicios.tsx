import type { MouseEvent } from 'react'
import { Code, Globe, Headset, Robot } from '@phosphor-icons/react'
import { servicios, type Servicio } from '../data/content'
import Reveal from './ui/Reveal'
import WhatsAppButton from './ui/WhatsAppButton'

const ICONOS = { sistemas: Code, webs: Globe, soporte: Headset, ia: Robot }

// El borde y el fondo se iluminan siguiendo al puntero (variables CSS, sin re-render)
function onMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

function Tarjeta({ s, grande }: { s: Servicio; grande?: boolean }) {
  const Icon = ICONOS[s.icono]
  return (
    <article
      onMouseMove={onMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-line-dark bg-navy-2 p-6 transition-colors duration-300 hover:border-brand/40 sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(10,96,254,0.16), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand-soft">
          <Icon size={22} weight="duotone" aria-hidden="true" />
        </span>
        <h3 className={`h-display mt-5 text-white ${grande ? 'text-2xl sm:text-[1.7rem]' : 'text-xl'}`}>{s.titulo}</h3>
        <p className="text-pretty mt-2 leading-relaxed text-mist">{s.descripcion}</p>
      </div>
    </article>
  )
}

export default function Servicios() {
  const principales = servicios.filter((s) => !s.secundario)
  const ia = servicios.find((s) => s.secundario)
  const [primero, ...otros] = principales

  return (
    <section id="a-medida" className="relative bg-navy py-24 sm:py-32">
      <div className="container-bt grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h-display text-[2.1rem] leading-[1.08] text-white sm:text-5xl">¿Tu negocio necesita algo distinto?</h2>
          <p className="text-pretty mt-5 max-w-[46ch] text-lg leading-relaxed text-mist">
            Si ningún sistema encaja tal cual, lo desarrollamos a medida. Desde una planilla que se volvió inmanejable hasta un sistema completo.
          </p>
          <WhatsAppButton
            mensaje="Hola Tomás, necesito un sistema a medida para mi negocio. ¿Podemos charlar?"
            size="lg"
            className="mt-8"
          >
            Consultar por WhatsApp
          </WhatsAppButton>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal className="sm:col-span-2">
            <Tarjeta s={primero} grande />
          </Reveal>
          {otros.map((s, i) => (
            <Reveal key={s.titulo} delay={0.08 * (i + 1)}>
              <Tarjeta s={s} />
            </Reveal>
          ))}
          {ia && (
            <Reveal className="sm:col-span-2" delay={0.2}>
              <div className="flex items-start gap-4 rounded-2xl border border-dashed border-line-dark px-6 py-5">
                <Robot size={22} weight="duotone" className="mt-0.5 shrink-0 text-mist" aria-hidden="true" />
                <p className="text-[0.95rem] leading-relaxed text-mist">
                  <span className="font-semibold text-white/80">{ia.titulo}.</span> {ia.descripcion}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
