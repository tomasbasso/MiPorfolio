import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Aparición al entrar en pantalla: sube y se desvanece. Estático con reduced motion.
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
