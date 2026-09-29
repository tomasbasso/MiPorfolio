import { CheckCircle, Desktop, Globe, PlusCircle } from '@phosphor-icons/react'
import type { Producto } from '../data/content'
import DeviceFrame from './ui/DeviceFrame'
import Reveal from './ui/Reveal'
import WhatsAppButton from './ui/WhatsAppButton'
import StockScreen from './screens/StockScreen'
import IndumentariaScreen from './screens/IndumentariaScreen'
import KinesioScreen from './screens/KinesioScreen'
import TurneroScreen from './screens/TurneroScreen'

function Pantalla({ producto }: { producto: Producto }) {
  switch (producto.id) {
    case 'stock':
      return (
        <DeviceFrame variant="desktop" title={producto.nombre}>
          <StockScreen />
        </DeviceFrame>
      )
    case 'indumentaria':
      return (
        <DeviceFrame variant="desktop" title={producto.nombre}>
          <IndumentariaScreen />
        </DeviceFrame>
      )
    case 'kinesio':
      return (
        <DeviceFrame variant="desktop" title={producto.nombre}>
          <KinesioScreen />
        </DeviceFrame>
      )
    case 'turnero':
      // Composición distinta: navegador + celular, porque se usa desde los dos
      return (
        <div className="relative pb-10 pr-6 sm:pr-10">
          <DeviceFrame variant="browser" url="turnos.tuconsultorio.com.ar">
            <TurneroScreen />
          </DeviceFrame>
          <div className="absolute -bottom-2 right-0 w-[28%] min-w-[104px] max-w-[160px]">
            <DeviceFrame variant="phone">
              <TurneroScreen compact />
            </DeviceFrame>
          </div>
        </div>
      )
  }
}

export default function ProductoFila({ producto, invertido }: { producto: Producto; invertido: boolean }) {
  const PlataformaIcon = producto.plataforma === 'Web' ? Globe : Desktop

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby={`producto-${producto.id}`}>
      <Reveal className={invertido ? 'lg:order-last' : ''} y={40}>
        <Pantalla producto={producto} />
        <p className="mt-4 text-center text-xs text-ink-soft/80">Pantalla de ejemplo con datos ficticios.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-[13px] font-semibold text-[#0A4FD6]">{producto.rubro}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-[13px] font-medium text-ink-soft">
            <PlataformaIcon size={14} weight="bold" aria-hidden="true" />
            {producto.plataforma === 'Web' ? 'Web, funciona online' : 'Programa de escritorio'}
          </span>
        </div>

        <h3 id={`producto-${producto.id}`} className="h-display mt-5 text-3xl text-ink sm:text-[2.15rem]">
          {producto.nombre}
        </h3>
        <p className="text-pretty mt-3 text-lg font-medium leading-snug text-ink">{producto.frase}</p>
        <p className="text-pretty mt-3 max-w-[60ch] leading-relaxed text-ink-soft">{producto.descripcion}</p>

        <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {producto.funciones.map((f) => (
            <li key={f} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink">
              <CheckCircle size={19} weight="fill" className="mt-px shrink-0 text-brand" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {producto.opcional && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-brand/40 bg-white px-4 py-2 text-sm text-ink">
            <PlusCircle size={18} weight="bold" className="text-brand" aria-hidden="true" />
            <span>
              <span className="font-semibold">Opcional:</span> {producto.opcional}
            </span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppButton mensaje={producto.mensajeWhatsApp}>Consultar por WhatsApp</WhatsAppButton>
          {producto.demo && (
            <a
              href={producto.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Ver demo
            </a>
          )}
        </div>
      </Reveal>
    </article>
  )
}
