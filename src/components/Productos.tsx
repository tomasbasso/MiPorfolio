import { productos } from '../data/content'
import ProductoFila from './ProductoFila'
import Reveal from './ui/Reveal'

export default function Productos() {
  return (
    <section id="sistemas" className="bg-dots-light relative py-24 text-ink sm:py-32">
      <div className="container-bt">
        <Reveal className="max-w-[46rem]">
          <h2 className="h-display text-[2.1rem] leading-[1.08] sm:text-5xl">Sistemas listos para tu rubro, adaptados a tu negocio.</h2>
          <p className="text-pretty mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Cada uno nació para resolver el día a día de un negocio real. Lo instalamos, lo ajustamos a tu forma de trabajar y te acompañamos.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          {productos.map((p, i) => (
            <ProductoFila key={p.id} producto={p} invertido={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
