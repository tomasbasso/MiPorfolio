import { GraduationCap, MapPin } from '@phosphor-icons/react'
import { fundador } from '../data/content'
import Reveal from './ui/Reveal'

const ICONO_DATO = [GraduationCap, GraduationCap, MapPin]

export default function Fundador() {
  return (
    <section id="quien-soy" className="bg-dots-light py-24 text-ink sm:py-32">
      <div className="container-bt grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal y={36}>
          <div className="relative mx-4 max-w-[420px] sm:mx-auto">
            <div className="absolute -inset-3 -z-0 rotate-[-2.5deg] rounded-[1.4rem] bg-brand" aria-hidden="true" />
            <img
              src={fundador.foto}
              alt={`${fundador.nombre}, fundador de BASSO TECH`}
              loading="lazy"
              width={900}
              height={1125}
              className="relative aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-frame"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="h-display text-[2.1rem] leading-[1.08] sm:text-5xl">Hablás directo con quien hace tu sistema.</h2>
          <p className="mt-6 font-display text-lg font-semibold text-ink">
            {fundador.nombre}
            <span className="font-sans font-normal text-ink-soft">, {fundador.rol}</span>
          </p>
          <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {fundador.bio.map((parrafo) => (
              <p key={parrafo.slice(0, 20)} className="text-pretty max-w-[60ch]">
                {parrafo}
              </p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {fundador.datos.map((d, i) => {
              const Icon = ICONO_DATO[i] ?? MapPin
              return (
                <li key={d} className="flex items-center gap-3 text-[0.95rem] text-ink">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon size={18} weight="duotone" aria-hidden="true" />
                  </span>
                  {d}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
