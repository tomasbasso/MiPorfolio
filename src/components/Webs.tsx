import { ArrowUpRight } from '@phosphor-icons/react'
import { webs, type Web } from '../data/content'
import DeviceFrame from './ui/DeviceFrame'
import Reveal from './ui/Reveal'

// Tarjeta de una web realizada. Al pasar el mouse, la captura se desplaza como si se hiciera scroll en el sitio.
function WebCard({ web, destacada }: { web: Web; destacada: boolean }) {
  return (
    <a
      href={web.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line-light bg-paper p-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-frame sm:p-4"
    >
      <DeviceFrame
        variant="browser"
        url={web.dominio}
        className={`!shadow-none ${destacada ? 'lg:flex lg:flex-1 lg:flex-col' : ''}`}
        bodyClassName={destacada ? 'lg:flex-1' : ''}
      >
        <div className={`overflow-hidden ${destacada ? 'h-[300px] sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto' : 'h-[210px] sm:h-[230px]'}`}>
          <img
            src={web.captura}
            alt={`Captura del sitio de ${web.nombre}`}
            loading="lazy"
            width={1200}
            height={2400}
            className="h-full w-full object-cover object-top transition-[object-position] duration-[4500ms] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover:object-bottom motion-reduce:transition-none"
          />
        </div>
      </DeviceFrame>
      <div className={`flex items-end justify-between gap-4 px-2 pb-1 pt-5 ${destacada ? '' : 'flex-1'}`}>
        <div>
          <p className="text-[13px] font-semibold text-[#0A4FD6]">{web.tipo}</p>
          <h3 className="h-display mt-1 text-2xl text-ink">{web.nombre}</h3>
          <p className="text-pretty mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-soft">{web.descripcion}</p>
        </div>
        <span
          className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-light bg-white text-ink transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight size={19} weight="bold" />
        </span>
      </div>
      <span className="sr-only">Visitar {web.dominio} (se abre en una pestaña nueva)</span>
    </a>
  )
}

export default function Webs() {
  const [principal, ...resto] = webs
  return (
    <section id="webs" className="bg-paper-2 py-24 text-ink sm:py-32">
      <div className="container-bt">
        <Reveal className="max-w-[44rem]">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">Páginas web</p>
          <h2 className="h-display text-[2.1rem] leading-[1.08] sm:text-5xl">Sitios que ya están online y trabajando.</h2>
          <p className="text-pretty mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Rápidos, pensados para el celular y conectados a WhatsApp. Entrá a verlos funcionando.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          <Reveal className="lg:row-span-2">
            <WebCard web={principal} destacada />
          </Reveal>
          {resto.map((w, i) => (
            <Reveal key={w.id} delay={0.08 * (i + 1)}>
              <WebCard web={w} destacada={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
