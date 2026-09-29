import { fundador, navLinks } from '../data/content'
import { Wordmark } from './Navbar'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line-dark bg-navy py-12">
      <div className="container-bt flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="BASSO TECH, volver al inicio">
            <img src="/brand/isotipo.svg" alt="" className="h-8 w-auto" width={29} height={32} />
            <Wordmark className="text-[15px] text-white" />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Desarrollo de software y páginas web desde Winifreda, La Pampa, para comercios, consultorios y PyMEs de todo el país.
          </p>
        </div>

        <nav aria-label="Secciones">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="text-white/65 transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* El año queda fijo en el HTML prerenderizado; si cambió desde el build, el cliente lo corrige sin avisar */}
      <div className="container-bt mt-10 border-t border-line-dark pt-6 text-[13px] text-mist" suppressHydrationWarning>
        © {year} BASSO TECH. {fundador.nombre}.
      </div>
    </footer>
  )
}
