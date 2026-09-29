import { rubros } from '../data/content'

// Franja con los rubros para los que trabajamos. Se duplica la lista para que el bucle no tenga cortes.
export default function Rubros() {
  const fila = (oculta: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {rubros.map((r) => (
        <li key={r} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-[1.35rem] font-semibold text-white/55 sm:text-2xl">{r}</span>
          <span className="text-brand/70" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="Rubros" className="relative overflow-hidden border-y border-line-dark bg-navy-2 py-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-2 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-2 to-transparent"
        aria-hidden="true"
      />
      <div className="marquee-track flex w-max">
        {fila(false)}
        {fila(true)}
      </div>
    </section>
  )
}
