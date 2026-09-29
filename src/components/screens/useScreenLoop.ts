import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useLoop } from '../../hooks/useLoop'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Paso actual de la animación de una pantalla. Solo avanza visible en pantalla y sin reduced motion;
// si no se anima, devuelve el paso final (estado completo).
export function useScreenLoop(steps: number, intervalMs: number, finalStep: number, animate = true) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduced = useReducedMotion()
  const moving = animate && !reduced
  const step = useLoop(steps, intervalMs, moving && inView)
  return { ref, step: moving ? step : finalStep, moving }
}

export const ars = (n: number) => `$ ${n.toLocaleString('es-AR')}`
