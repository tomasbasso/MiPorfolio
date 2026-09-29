import { AnimatePresence, motion } from 'framer-motion'
import { Barcode, ChartBar, Hoodie, House, Package, ShoppingCart, Tag, Users } from '@phosphor-icons/react'
import ScaledScreen from '../ui/ScaledScreen'
import { ars, useScreenLoop } from './useScreenLoop'

// Recreación de la ficha de producto del Stock para Indumentaria (paleta carbón + bronce, datos de ejemplo)
const TALLES = ['S', 'M', 'L', 'XL', 'XXL']
const COLORES = [
  { nombre: 'Negro', hex: '#1A1A1A' },
  { nombre: 'Gris topo', hex: '#8B8580' },
  { nombre: 'Arena', hex: '#D8C8AE' },
  { nombre: 'Verde oliva', hex: '#5E6444' },
]
const STOCK_INICIAL = [
  [4, 7, 6, 3, 1],
  [2, 5, 5, 2, 0],
  [3, 4, 3, 1, 1],
  [1, 3, 2, 2, 0],
]
// Ventas que se van registrando: [fila color, columna talle]
const VENTAS: [number, number][] = [
  [0, 2],
  [2, 1],
  [0, 3],
  [1, 0],
]
const PASOS = VENTAS.length + 2
const FINAL = VENTAS.length

const NAV = [
  { label: 'Inicio', icon: House },
  { label: 'Ventas', icon: ShoppingCart },
  { label: 'Productos', icon: Package, active: true },
  { label: 'Categorías', icon: Tag },
  { label: 'Clientes', icon: Users },
  { label: 'Reportes', icon: ChartBar },
]

export default function IndumentariaScreen({ animate = true }: { animate?: boolean }) {
  const { ref, step } = useScreenLoop(PASOS, 1500, FINAL, animate)
  const hechas = VENTAS.slice(0, Math.min(step, VENTAS.length))
  const stock = STOCK_INICIAL.map((fila) => [...fila])
  hechas.forEach(([c, t]) => (stock[c][t] -= 1))
  const ultima = step >= 1 && step <= VENTAS.length ? VENTAS[step - 1] : null
  const total = stock.flat().reduce((a, b) => a + b, 0)

  return (
    <div ref={ref} role="img" aria-label="Ficha de producto con stock por talles y colores, con datos de ejemplo">
      <ScaledScreen baseWidth={760} baseHeight={468}>
        <div className="relative flex h-full w-full bg-[#FAF9F7] font-sans text-[#1A1A1A]" aria-hidden="true">
          <aside className="flex w-[150px] shrink-0 flex-col border-r border-[#E8E4DD] px-3 py-4 text-[12.5px] text-[#6B6560]">
            <div className="mb-6 flex items-center gap-2 px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] font-display text-[12px] font-bold text-[#FAF9F7]">
                N
              </div>
              <div className="text-[12px] font-semibold tracking-[0.12em] text-[#1A1A1A]">NORTE</div>
            </div>
            {NAV.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={`mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 ${active ? 'bg-[#1A1A1A] font-semibold text-[#FAF9F7]' : ''}`}
              >
                <Icon size={15} weight={active ? 'fill' : 'regular'} />
                {label}
              </div>
            ))}
          </aside>

          <main className="flex min-w-0 flex-1 flex-col p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-[#EFEAE2] text-[#1A1A1A]">
                <Hoodie size={40} weight="duotone" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9A7B4F]">Buzos</div>
                <div className="font-display text-[20px] font-bold leading-tight">Buzo oversize frisa</div>
                <div className="mt-1 flex gap-4 text-[11.5px] text-[#6B6560]">
                  <span>
                    Precio <b className="text-[#1A1A1A]">{ars(38900)}</b>
                  </span>
                  <span>
                    Costo <b className="text-[#1A1A1A]">{ars(21000)}</b>
                  </span>
                  <span>
                    Margen <b className="text-[#9A7B4F]">46%</b>
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-[#E8E4DD] bg-white px-3 py-2 text-right">
                <div className="text-[10px] uppercase tracking-wide text-[#6B6560]">Stock total</div>
                <motion.div key={total} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-[20px] font-bold tabular-nums">
                  {total}
                </motion.div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-[12.5px] font-semibold">Variantes: talles y colores</div>
              <div className="flex items-center gap-3 text-[10.5px] text-[#6B6560]">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-[#9A7B4F]" />
                  Últimas unidades
                </span>
                <span className="flex items-center gap-1">
                  <Barcode size={13} />
                  Código por variante
                </span>
              </div>
            </div>

            <div className="mt-2 overflow-hidden rounded-lg border border-[#E8E4DD] bg-white">
              <div className="grid grid-cols-[130px_repeat(5,1fr)] border-b border-[#E8E4DD] bg-[#F4F1EC] text-[11px] font-semibold text-[#6B6560]">
                <div className="px-3 py-2">Color</div>
                {TALLES.map((t) => (
                  <div key={t} className="py-2 text-center">
                    {t}
                  </div>
                ))}
              </div>
              {COLORES.map((color, c) => (
                <div key={color.nombre} className="grid grid-cols-[130px_repeat(5,1fr)] border-b border-[#F1EEE9] last:border-0">
                  <div className="flex items-center gap-2 px-3 py-2.5 text-[12px]">
                    <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: color.hex }} />
                    {color.nombre}
                  </div>
                  {TALLES.map((t, ti) => {
                    const n = stock[c][ti]
                    const flash = ultima && ultima[0] === c && ultima[1] === ti
                    return (
                      <div key={t} className="flex items-center justify-center py-1.5">
                        <motion.span
                          key={`${n}-${flash}`}
                          initial={flash ? { scale: 1.35, backgroundColor: 'rgba(154,123,79,0.35)' } : false}
                          animate={{ scale: 1, backgroundColor: 'rgba(154,123,79,0)' }}
                          transition={{ duration: 0.9 }}
                          className={`min-w-[40px] rounded-md px-2 py-1 text-center text-[12.5px] font-semibold tabular-nums ${
                            n === 0 ? 'text-[#B8B2AA] line-through' : n <= 2 ? 'text-[#9A7B4F]' : 'text-[#1A1A1A]'
                          }`}
                        >
                          {n === 0 ? 'Agot.' : n}
                        </motion.span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </main>

          <AnimatePresence>
            {ultima && (
              <motion.div
                key={`${ultima[0]}-${ultima[1]}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-3.5 py-2 text-[12px] text-[#FAF9F7] shadow-lg"
              >
                <ShoppingCart size={15} weight="fill" className="text-[#C9A877]" />
                Vendido: {COLORES[ultima[0]].nombre} · talle {TALLES[ultima[1]]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScaledScreen>
    </div>
  )
}
