import { AnimatePresence, motion } from 'framer-motion'
import {
  Baby,
  CalendarBlank,
  CheckCircle,
  ClipboardText,
  HandHeart,
  Heartbeat,
  Stethoscope,
  User,
} from '@phosphor-icons/react'
import ScaledScreen from '../ui/ScaledScreen'
import { useScreenLoop } from './useScreenLoop'

// Recreación del asistente de reserva del Turnero online (verde azulado de la app, datos de ejemplo)
const TEAL = '#0F9D8A'
const PASOS_UI = [
  { label: 'Especialidad', icon: Stethoscope },
  { label: 'Médico', icon: User },
  { label: 'Fecha y hora', icon: CalendarBlank },
  { label: 'Tus datos', icon: ClipboardText },
  { label: 'Confirmación', icon: CheckCircle },
]
const ESPECIALIDADES = [
  { label: 'Clínica médica', icon: Stethoscope },
  { label: 'Pediatría', icon: Baby },
  { label: 'Cardiología', icon: Heartbeat },
  { label: 'Dermatología', icon: HandHeart },
]
const DIAS = ['Lun 28', 'Mar 29', 'Mié 30', 'Jue 1', 'Vie 2']
const HORARIOS = ['9:00', '9:20', '9:40', '10:00', '10:20', '10:40', '11:00', '11:20']
const OCUPADOS = new Set(['9:20', '10:40'])

function Contenido({ paso, compact }: { paso: number; compact: boolean }) {
  const cols = compact ? 'grid-cols-1' : 'grid-cols-2'
  if (paso === 0)
    return (
      <>
        <Titulo t="Elegí una especialidad" s="Seleccioná el área médica que necesitás" />
        <div className={`grid gap-2 ${cols}`}>
          {ESPECIALIDADES.map(({ label, icon: Icon }, i) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[12.5px] font-medium ${i === 1 ? 'border-[#0F9D8A] bg-[#E8F6F3] text-[#0B5E53]' : 'border-[#E5ECEB] text-[#334155]'}`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${i === 1 ? 'bg-[#0F9D8A] text-white' : 'bg-[#F1F5F4] text-[#0F9D8A]'}`}>
                <Icon size={15} weight="bold" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </>
    )
  if (paso === 1)
    return (
      <>
        <Titulo t="Elegí un profesional" s="Pediatría" />
        <div className="grid gap-2">
          {[
            { n: 'Dra. Paula Giménez', d: 'Lunes a viernes, 9 a 13 h' },
            { n: 'Dr. Martín Acosta', d: 'Martes y jueves, 15 a 19 h' },
          ].map((m, i) => (
            <div key={m.n} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${i === 0 ? 'border-[#0F9D8A] bg-[#E8F6F3]' : 'border-[#E5ECEB]'}`}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D5EEE9] text-[11px] font-bold text-[#0B5E53]">
                {m.n.split(' ')[1][0]}
                {m.n.split(' ')[2][0]}
              </span>
              <div>
                <div className="text-[12.5px] font-semibold text-[#0F172A]">{m.n}</div>
                <div className="text-[11px] text-[#64748B]">{m.d}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  if (paso === 2)
    return (
      <>
        <Titulo t="Elegí fecha y hora" s="Dra. Paula Giménez" />
        <div className={`mb-2.5 grid gap-1.5 ${compact ? 'grid-cols-5' : 'grid-cols-5'}`}>
          {DIAS.map((d, i) => (
            <div key={d} className={`rounded-lg py-1.5 text-center text-[11px] font-medium ${i === 3 ? 'bg-[#0F9D8A] text-white' : 'bg-[#F1F5F4] text-[#334155]'}`}>
              {d}
            </div>
          ))}
        </div>
        <div className={`grid gap-1.5 ${compact ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {HORARIOS.map((h) => (
            <div
              key={h}
              className={`rounded-lg border py-1.5 text-center text-[12px] font-medium ${
                h === '10:00'
                  ? 'border-[#0F9D8A] bg-[#0F9D8A] text-white'
                  : OCUPADOS.has(h)
                    ? 'border-[#EEF2F1] text-[#CBD5E1] line-through'
                    : 'border-[#E5ECEB] text-[#334155]'
              }`}
            >
              {h}
            </div>
          ))}
        </div>
      </>
    )
  if (paso === 3)
    return (
      <>
        <Titulo t="Tus datos" s="No hace falta crear una cuenta" />
        <div className="grid gap-2">
          {[
            ['Nombre y apellido', 'Sofía Herrera'],
            ['DNI', '38.456.221'],
            ['Email', 'sofia.herrera@correo.com'],
          ].map(([l, v]) => (
            <div key={l}>
              <div className="mb-0.5 text-[10.5px] font-medium text-[#64748B]">{l}</div>
              <div className="rounded-lg border border-[#E5ECEB] bg-white px-3 py-2 text-[12px] text-[#0F172A]">{v}</div>
            </div>
          ))}
        </div>
      </>
    )
  return (
    <div className="flex flex-col items-center pt-2 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
        <CheckCircle size={46} weight="fill" color={TEAL} />
      </motion.div>
      <div className="mt-2 text-[16px] font-bold text-[#0F172A]">Turno confirmado</div>
      <div className="mt-3 w-full rounded-xl bg-[#F1F8F6] px-4 py-3 text-left text-[12px] leading-relaxed text-[#334155]">
        <div>
          <b>Pediatría</b> con Dra. Paula Giménez
        </div>
        <div>Jueves 1 de octubre, 10:00 h</div>
      </div>
      <div className="mt-2.5 text-[11px] text-[#64748B]">Te enviamos un recordatorio por email el día anterior.</div>
    </div>
  )
}

function Titulo({ t, s }: { t: string; s: string }) {
  return (
    <div className="mb-3">
      <div className="text-[16px] font-bold text-[#0F172A]">{t}</div>
      <div className="text-[11.5px] text-[#64748B]">{s}</div>
    </div>
  )
}

export default function TurneroScreen({ animate = true, compact = false }: { animate?: boolean; compact?: boolean }) {
  const { ref, step } = useScreenLoop(6, 1900, 2, animate)
  const paso = Math.min(step, 4)
  const base = compact ? { w: 300, h: 600 } : { w: 760, h: 468 }

  return (
    <div ref={ref} role="img" aria-label="Asistente de reserva de turnos online paso a paso, con datos de ejemplo">
      <ScaledScreen baseWidth={base.w} baseHeight={base.h}>
        <div
          className="flex h-full w-full flex-col font-sans"
          style={{ background: 'radial-gradient(70% 60% at 100% 0%, #E3F4F0 0%, transparent 60%), #F7FAFA' }}
          aria-hidden="true"
        >
          <header className={`flex items-center gap-2 border-b border-[#E5ECEB] bg-white/80 px-4 ${compact ? 'pb-2.5 pt-9' : 'py-2.5'}`}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: TEAL }}>
              <Heartbeat size={14} weight="bold" color="#fff" />
            </span>
            <span className="text-[13px] font-bold text-[#0F172A]">Turnero Médico</span>
          </header>

          <div className={`flex flex-1 justify-center ${compact ? 'px-3 pt-3' : 'px-6 pt-5'}`}>
            <div className={`flex w-full flex-col rounded-2xl border border-[#E5ECEB] bg-white shadow-[0_18px_40px_-24px_rgba(15,157,138,0.45)] ${compact ? 'p-3.5' : 'max-w-[540px] p-5'}`}>
              {compact ? (
                <div className="mb-3">
                  <div className="mb-1.5 flex justify-between text-[10.5px] font-medium text-[#64748B]">
                    <span style={{ color: TEAL }}>{PASOS_UI[paso].label}</span>
                    <span>Paso {paso + 1} de 5</span>
                  </div>
                  <div className="flex gap-1">
                    {PASOS_UI.map((p, i) => (
                      <span key={p.label} className="h-1 flex-1 rounded-full transition-colors duration-500" style={{ background: i <= paso ? TEAL : '#E5ECEB' }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4 grid grid-cols-5">
                  {PASOS_UI.map(({ label, icon: Icon }, i) => (
                    <div key={label} className="relative flex flex-col items-center gap-1">
                      {i > 0 && (
                        <span className="absolute right-1/2 top-[15px] h-px w-full" style={{ background: i <= paso ? TEAL : '#E5ECEB' }} />
                      )}
                      <span
                        className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-colors duration-500"
                        style={
                          i <= paso
                            ? { background: TEAL, borderColor: TEAL, color: '#fff' }
                            : { background: '#fff', borderColor: '#E5ECEB', color: '#94A3B8' }
                        }
                      >
                        <Icon size={14} weight="bold" />
                      </span>
                      <span className="text-[10px] font-medium" style={{ color: i === paso ? TEAL : '#94A3B8' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={paso}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.3 }}
                >
                  <Contenido paso={paso} compact={compact} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScaledScreen>
    </div>
  )
}
