import { useEffect, useState } from 'react'

// Índice que avanza de 0 a steps-1 en bucle cada intervalMs, solo mientras active
export function useLoop(steps: number, intervalMs: number, active: boolean): number {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), intervalMs)
    return () => window.clearInterval(id)
  }, [steps, intervalMs, active])

  return step
}
