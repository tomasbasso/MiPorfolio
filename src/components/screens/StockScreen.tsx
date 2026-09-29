import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import {
  Barcode,
  CashRegister,
  ChartBar,
  CheckCircle,
  FileText,
  House,
  Package,
  ShoppingCart,
  Users,
  Warning,
} from '@phosphor-icons/react'
import ScaledScreen from '../ui/ScaledScreen'
import { ars, useScreenLoop } from './useScreenLoop'

// Recreación del Punto de Venta de la app de Stock (paleta slate de la app, datos de ejemplo)
const ITEMS = [
  { nombre: 'Yerba Playadito 1 kg', cant: 1, precio: 4250 },
  { nombre: 'Azúcar Ledesma 1 kg', cant: 2, precio: 1290 },
  { nombre: 'Aceite Natura 1,5 L', cant: 1, precio: 3890 },
  { nombre: 'Galletitas Criollitas x3', cant: 1, precio: 2150 },
  { nombre: 'Leche La Serenísima 1 L', cant: 2, precio: 1230 },
]
const NAV = [
  { label: 'Inicio', icon: House },
  { label: 'Punto de venta', icon: ShoppingCart, active: true },
  { label: 'Productos', icon: Package },
  { label: 'Clientes', icon: Users },
  { label: 'Presupuestos', icon: FileText },
  { label: 'Caja', icon: CashRegister },
  { label: 'Reportes', icon: ChartBar },
]
const PASOS = ITEMS.length + 3 // ítems + venta registrada + pausa
const FINAL = ITEMS.length

function Total({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 })
  const text = useTransform(spring, (v) => ars(Math.round(v)))
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span>{text}</motion.span>
}

export default function StockScreen({ animate = true }: { animate?: boolean }) {
  const { ref, step } = useScreenLoop(PASOS, 1100, FINAL, animate)
  const visibles = ITEMS.slice(0, Math.min(step, ITEMS.length))
  const vendida = step > ITEMS.length
  const total = visibles.reduce((acc, i) => acc + i.cant * i.precio, 0)

  return (
    <div ref={ref} role="img" aria-label="Pantalla de punto de venta del sistema de Stock, con datos de ejemplo">
      <ScaledScreen baseWidth={760} baseHeight={468}>
        <div className="relative flex h-full w-full bg-[#F8FAFC] font-sans text-[#1E293B]" aria-hidden="true">
          <aside className="flex w-[168px] shrink-0 flex-col bg-[#1E293B] px-3 py-4 text-[12.5px] text-[#CBD5E1]">
            <div className="mb-5 flex items-center gap-2 px-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 font-display text-[13px] font-bold text-white">
                LE
              </div>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-white">La Esquina</div>
                <div className="text-[10px] text-[#94A3B8]">Almacén</div>
              </div>
            </div>
            {NAV.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${active ? 'bg-white/10 font-semibold text-white' : ''}`}
              >
                <Icon size={16} weight={active ? 'fill' : 'regular'} />
                {label}
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#D97706]/15 px-2.5 py-2 text-[11px] text-[#FCD34D]">
              <Warning size={14} weight="fill" />3 productos con stock bajo
            </div>
          </aside>

          <main className="flex min-w-0 flex-1 flex-col p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[17px] font-bold">Punto de venta</div>
                <div className="text-[11px] text-[#64748B]">Caja 1 abierta · Martes 29/09</div>
              </div>
              <div className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-[11px] text-[#475569]">Vendedor: Luis</div>
            </div>

            <div className="flex min-h-0 flex-1 gap-3">
              <section className="flex min-w-0 flex-1 flex-col rounded-xl border border-[#E2E8F0] bg-white">
                <div className="m-3 flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[12px] text-[#94A3B8]">
                  <Barcode size={18} className="text-[#1E293B]" />
                  Escaneá o buscá un producto
                </div>
                <div className="grid grid-cols-[1fr_44px_84px] border-y border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#64748B]">
                  <span>Producto</span>
                  <span className="text-center">Cant.</span>
                  <span className="text-right">Subtotal</span>
                </div>
                <div className="flex-1 px-3">
                  <AnimatePresence initial={false}>
                    {visibles.map((item, i) => (
                      <motion.div
                        key={item.nombre}
                        initial={{ opacity: 0, x: -14, backgroundColor: 'rgba(10,96,254,0.10)' }}
                        animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(10,96,254,0)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, backgroundColor: { duration: 1.2 } }}
                        className="grid grid-cols-[1fr_44px_84px] items-center border-b border-[#F1F5F9] py-2 text-[12.5px]"
                      >
                        <span className="truncate">
                          <span className="mr-2 text-[10px] text-[#94A3B8]">{String(i + 1).padStart(2, '0')}</span>
                          {item.nombre}
                        </span>
                        <span className="text-center text-[#475569]">{item.cant}</span>
                        <span className="text-right font-semibold tabular-nums">{ars(item.cant * item.precio)}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              <section className="flex w-[218px] shrink-0 flex-col rounded-xl border border-[#E2E8F0] bg-white p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Total a cobrar</div>
                <div className="mt-1 font-display text-[30px] font-bold tabular-nums leading-none">
                  <Total value={total} />
                </div>
                <div className="mt-1 text-[11px] text-[#64748B]">{visibles.reduce((a, i) => a + i.cant, 0)} artículos</div>

                <div className="mt-4 text-[11px] font-semibold text-[#475569]">Forma de pago</div>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-[10.5px]">
                  {['Efectivo', 'Débito', 'Transf.'].map((m, i) => (
                    <div
                      key={m}
                      className={`rounded-md border px-1 py-1.5 text-center ${i === 1 ? 'border-[#1E293B] bg-[#1E293B] text-white' : 'border-[#E2E8F0] text-[#475569]'}`}
                    >
                      {m}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F1F5F9] px-2.5 py-2 text-[11px]">
                  <span className="font-medium">Factura C · ARCA</span>
                  <span className="relative h-4 w-7 rounded-full bg-[#16A34A]">
                    <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
                  </span>
                </div>

                <div className="mt-auto rounded-lg bg-[#1E293B] py-2.5 text-center text-[13px] font-semibold text-white">Cobrar</div>
              </section>
            </div>
          </main>

          <AnimatePresence>
            {vendida && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#14532D] px-4 py-2.5 text-[12.5px] font-medium text-white shadow-lg"
              >
                <CheckCircle size={18} weight="fill" className="text-[#4ADE80]" />
                Venta registrada · Factura C N° 0003-00001847 · CAE aprobado
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScaledScreen>
    </div>
  )
}
