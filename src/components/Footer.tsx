import { Globe, ExternalLink } from 'lucide-react'
import { personal } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-10 px-6 text-center border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-5">
        <img
          src={personal.logo}
          alt="Logo TB"
          className="h-8 w-8 object-contain opacity-70"
        />

        <div className="flex gap-5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Tomás Basso"
            className="transition-colors hover:text-cyan-400"
            style={{ color: 'var(--text-muted)' }}
          >
            <Globe size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Tomás Basso"
            className="transition-colors hover:text-cyan-400"
            style={{ color: 'var(--text-muted)' }}
          >
            <ExternalLink size={18} />
          </a>
        </div>

        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          © {year} Tomás Basso Fernández
        </p>
      </div>
    </footer>
  )
}
