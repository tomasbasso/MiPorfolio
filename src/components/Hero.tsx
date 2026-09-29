import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import { ArrowDown } from '@phosphor-icons/react'
import { contacto, hero, marca } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import WhatsAppButton from './ui/WhatsAppButton'
import DeviceFrame from './ui/DeviceFrame'
import StockScreen from './screens/StockScreen'
import TurneroScreen from './screens/TurneroScreen'

const EASE = [0.16, 1, 0.3, 1] as const

const texto: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE } }),
}

export default function Hero() {
  const reduced = useReducedMotion()

  // Parallax suave con el puntero (solo punteros finos y sin reduced motion)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const deskX = useTransform(sx, (v) => v * -10)
  const deskY = useTransform(sy, (v) => v * -8)
  const phoneX = useTransform(sx, (v) => v * 18)
  const phoneY = useTransform(sy, (v) => v * 14)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const initial = reduced ? 'visible' : 'hidden'

  return (
    <section
      id="inicio"
      onPointerMove={onPointerMove}
      className="bg-glow relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+2.5rem)] lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-16 lg:pt-[calc(var(--nav-h)+1.5rem)]"
    >
      <div className="container-bt grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <div className="relative z-10 max-w-[640px]">
          <img
            src={marca.logoAnimado}
            alt="BASSO TECH"
            className="mb-7 h-[88px] w-auto sm:h-[104px]"
            width={154}
            height={104}
          />

          <motion.p
            variants={texto}
            custom={0.9}
            initial={initial}
            animate="visible"
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-soft"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={texto}
            custom={1.0}
            initial={initial}
            animate="visible"
            className="h-display text-[2.05rem] leading-[1.08] text-white sm:text-[2.9rem] lg:text-[2.45rem] xl:text-[3rem]"
          >
            {hero.titulo} <span className="text-brand-soft">{hero.tituloDestacado}</span>
          </motion.h1>

          <motion.p
            variants={texto}
            custom={1.15}
            initial={initial}
            animate="visible"
            className="text-pretty mt-5 max-w-[34rem] text-[1.08rem] leading-relaxed text-mist sm:text-lg"
          >
            {hero.subtitulo}
          </motion.p>

          <motion.div
            variants={texto}
            custom={1.3}
            initial={initial}
            animate="visible"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <WhatsAppButton mensaje={contacto.mensajeGeneral} size="lg">
              Consultar por WhatsApp
            </WhatsAppButton>
            <a
              href="#sistemas"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-dark px-7 font-semibold text-white/85 transition-colors hover:border-white/25 hover:text-white"
            >
              Ver sistemas
              <ArrowDown size={17} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 60, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            className="lg:ml-4"
          >
            <motion.div style={reduced ? undefined : { x: deskX, y: deskY }}>
              <DeviceFrame variant="desktop" title="Stock y Punto de Venta" tone="dark">
                <StockScreen />
              </DeviceFrame>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
            className="absolute -bottom-12 -left-2 w-[30%] min-w-[118px] max-w-[176px] sm:-left-6 lg:-left-10"
          >
            <motion.div style={reduced ? undefined : { x: phoneX, y: phoneY }}>
              <DeviceFrame variant="phone" tone="dark">
                <TurneroScreen compact />
              </DeviceFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
