import { AnimatePresence, motion } from 'framer-motion'
import { CalendarBlank, CaretDown, ClipboardText, Coins, Repeat, Users } from '@phosphor-icons/react'
import ScaledScreen from '../ui/ScaledScreen'
import { useScreenLoop } from './useScreenLoop'

// Recreación de la agenda de la app de Kinesiología (coral + colores por estado, datos de ejemplo)
const DIAS = ['Lun 28', 'Mar 29', 'Mié 30', 'Jue 1', 'Vie 2']
const HORAS = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
const ROW = 38
const ESTADO = {
  programado: { bg: '#EAF1FA', border: '#4F86C6', text: '#23507F' },
  atendido: { bg: '#E8F8EE', border: '#22C55E', text: '#166534' },
  ausente: { bg: '#FEF3E2', border: '#F59E0B', text: '#92400E' },
  nuevo: { bg: '#FFF1EE', border: '#DF6B59', text: '#9F3E33' },
}
type Estado = keyof typeof ESTADO

interface Turno {
  dia: number
  inicio: number // minutos desde las 8:00
  dur: number
  paciente: string
  detalle: string
  estado: Estado
}

const FIJOS: Turno[] = [
  { dia: 0, inicio: 0, dur: 45, paciente: 'Rosa Medina', detalle: 'Sesión 7 de 10', estado: 'atendido' },
  { dia: 1, inicio: 120, dur: 45, paciente: 'Hugo Álvarez', detalle: 'Esguince tobillo', estado: 'programado' },
  { dia: 1, inicio: 180, dur: 45, paciente: 'Lucía Benítez', detalle: 'Cervicalgia', estado: 'ausente' },
  { dia: 3, inicio: 30, dur: 45, paciente: 'Diego Ruiz', detalle: 'Post operatorio', estado: 'programado' },
  { dia: 3, inicio: 150, dur: 45, paciente: 'Rosa Medina', detalle: 'Sesión 8 de 10', estado: 'programado' },
  { dia: 4, inicio: 180, dur: 45, paciente: 'Julián Pereyra', detalle: 'Hombro', estado: 'programado' },
]
const SERIE: Turno[] = [0, 2, 4].map((dia, i) => ({
  dia,
  inicio: 60,
  dur: 45,
  paciente: 'Carla Sosa',
  detalle: `Sesión ${i + 1} de 10`,
  estado: 'nuevo',
}))
const PASOS = 6
const FINAL = 4

function Bloque({ t, animado }: { t: Turno; animado?: boolean }) {
  const c = ESTADO[t.estado]
  return (
    <motion.div
      layout={false}
      initial={animado ? { opacity: 0, scale: 0.85, y: -6 } : false}
      animate={{ opacity: 1, scale: 1, y: 0, backgroundColor: c.bg, borderColor: c.border }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1 right-1 overflow-hidden rounded-md border-l-[3px] px-1.5 py-1"
      style={{ top: (t.inicio / 30) * ROW + 2, height: (t.dur / 30) * ROW - 4 }}
    >
      <div className="truncate text-[11px] font-semibold" style={{ color: c.text }}>
        {t.paciente}
      </div>
      <div className="truncate text-[9.5px]" style={{ color: c.text, opacity: 0.8 }}>
        {t.detalle}
      </div>
    </motion.div>
  )
}

export default function KinesioScreen({ animate = true }: { animate?: boolean }) {
  const { ref, step } = useScreenLoop(PASOS, 1300, FINAL, animate)
  const serieVisible = SERIE.slice(0, Math.min(step, SERIE.length))
  const hugoAtendido = step >= 4
  const fijos = FIJOS.map((t) => (hugoAtendido && t.paciente === 'Hugo Álvarez' ? { ...t, estado: 'atendido' as Estado } : t))

  return (
    <div ref={ref} role="img" aria-label="Agenda semanal de kinesiología con turnos por estado, con datos de ejemplo">
      <ScaledScreen baseWidth={760} baseHeight={468}>
        <div className="flex h-full w-full flex-col bg-[#FBFAF9] font-sans text-[#2B2523]" aria-hidden="true">
          <header className="flex items-center justify-between border-b border-[#EFE8E4] bg-white px-4 py-2.5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DF6B59] text-white">
                  <CalendarBlank size={16} weight="bold" />
                </div>
                <span className="font-display text-[15px] font-bold">Agenda</span>
              </div>
              <div className="flex gap-1 text-[11.5px] text-[#7A6F6B]">
                {[
                  { l: 'Agenda', i: CalendarBlank, a: true },
                  { l: 'Pacientes', i: Users },
                  { l: 'Historia', i: ClipboardText },
                  { l: 'Caja', i: Coins },
                ].map(({ l, i: Icon, a }) => (
                  <span key={l} className={`flex items-center gap-1.5 rounded-md px-2 py-1 ${a ? 'bg-[#FFF1EE] font-semibold text-[#9F3E33]' : ''}`}>
                    <Icon size={13} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#EFE8E4] px-3 py-1 text-[11.5px]">
              <span className="h-5 w-5 rounded-full bg-[#F5A898]" />
              Lic. Valentina Ríos
              <CaretDown size={11} />
            </div>
          </header>

          <div className="flex min-h-0 flex-1 gap-3 p-3">
            <section className="min-w-0 flex-1 rounded-xl border border-[#EFE8E4] bg-white">
              <div className="grid grid-cols-[44px_repeat(5,1fr)] border-b border-[#EFE8E4] text-[11px] font-semibold text-[#7A6F6B]">
                <div className="py-2 text-center text-[10px] font-normal">sep/oct</div>
                {DIAS.map((d, i) => (
                  <div key={d} className={`py-2 text-center ${i === 1 ? 'text-[#DF6B59]' : ''}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[44px_repeat(5,1fr)]">
                <div>
                  {HORAS.map((h) => (
                    <div key={h} className="pr-1.5 pt-0.5 text-right text-[9.5px] text-[#A39893]" style={{ height: ROW }}>
                      {h}
                    </div>
                  ))}
                </div>
                {DIAS.map((d, dia) => (
                  <div key={d} className="relative border-l border-[#F3EEEB]" style={{ height: ROW * HORAS.length }}>
                    {HORAS.map((h, i) => (
                      <div key={h} className={`border-b ${i % 2 ? 'border-[#F3EEEB]' : 'border-dashed border-[#F6F2F0]'}`} style={{ height: ROW }} />
                    ))}
                    {fijos.filter((t) => t.dia === dia).map((t) => (
                      <Bloque key={`${t.paciente}-${t.inicio}`} t={t} />
                    ))}
                    <AnimatePresence>
                      {serieVisible
                        .filter((t) => t.dia === dia)
                        .map((t) => (
                          <Bloque key={`serie-${t.dia}`} t={t} animado />
                        ))}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            <aside className="flex w-[188px] shrink-0 flex-col gap-2.5">
              <div className="rounded-xl border border-[#EFE8E4] bg-white p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9F3E33]">
                  <Repeat size={13} weight="bold" />
                  Nuevo tratamiento
                </div>
                <div className="mt-1.5 text-[13px] font-semibold">Carla Sosa</div>
                <div className="text-[11px] text-[#7A6F6B]">Lumbalgia · 10 sesiones</div>
                <div className="mt-1 text-[11px] text-[#7A6F6B]">Lun, Mié y Vie a las 9:00</div>
                <div className="mt-2.5 flex items-center justify-between text-[10.5px] text-[#7A6F6B]">
                  <span>Turnos generados</span>
                  <span className="font-semibold text-[#2B2523]">{serieVisible.length} de 10</span>
                </div>
                <div className="mt-1 flex gap-[3px]">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full ${i < serieVisible.length ? 'bg-[#DF6B59]' : 'bg-[#F3EEEB]'}`} />
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-[#16A34A]">Sin superposiciones</div>
              </div>

              <div className="rounded-xl border border-[#EFE8E4] bg-white p-3">
                <div className="text-[11px] font-semibold">Historia clínica</div>
                <div className="mt-1 text-[10.5px] leading-snug text-[#7A6F6B]">
                  Rosa Medina, sesión 7: mejora la movilidad lumbar, se suman ejercicios de fortalecimiento.
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-1.5 text-[10px]">
                {(['programado', 'atendido', 'ausente', 'nuevo'] as Estado[]).map((e) => (
                  <span key={e} className="flex items-center gap-1.5 capitalize text-[#7A6F6B]">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ESTADO[e].border }} />
                    {e}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </ScaledScreen>
    </div>
  )
}
