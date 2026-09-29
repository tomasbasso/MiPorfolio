import { EnvelopeSimple, MapPin, WhatsappLogo } from '@phosphor-icons/react'
import { contacto } from '../data/content'
import { waLink } from '../lib/whatsapp'
import Reveal from './ui/Reveal'
import WhatsAppButton from './ui/WhatsAppButton'

export default function Cierre() {
  const datos = [
    { icon: WhatsappLogo, label: contacto.whatsappVisible, href: waLink(contacto.mensajeGeneral), externo: true },
    { icon: EnvelopeSimple, label: contacto.email, href: `mailto:${contacto.email}` },
    { icon: MapPin, label: contacto.ubicacion },
  ]

  return (
    <section id="contacto" className="bg-glow relative overflow-hidden py-28 sm:py-36">
      <img
        src="/brand/isotipo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 opacity-[0.05] sm:-right-10"
      />
      <div className="container-bt relative">
        <Reveal className="max-w-[44rem]">
          <h2 className="h-display text-[2.4rem] leading-[1.04] text-white sm:text-6xl">¿Hablamos de tu negocio?</h2>
          <p className="text-pretty mt-6 max-w-[48ch] text-lg leading-relaxed text-mist sm:text-xl">
            Contame qué necesitás y te respondo personalmente. Sin compromiso, sin formularios.
          </p>
          <WhatsAppButton mensaje={contacto.mensajeGeneral} size="lg" className="mt-10">
            Consultar por WhatsApp
          </WhatsAppButton>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-16 flex flex-col gap-5 border-t border-line-dark pt-8 sm:flex-row sm:flex-wrap sm:gap-x-12">
            {datos.map(({ icon: Icon, label, href, externo }) => (
              <li key={label} className="flex items-center gap-3 text-white/80">
                <Icon size={20} weight="duotone" className="shrink-0 text-brand-soft" aria-hidden="true" />
                {href ? (
                  <a
                    href={href}
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
