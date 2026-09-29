import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'
import { contacto } from '../data/content'
import { waLink } from '../lib/whatsapp'

// Botón flotante: aparece recién después del hero, para no duplicar el botón principal
export default function WhatsAppFlotante() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 0.8
    if (next !== visible) setVisible(next)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waLink(contacto.mensajeGeneral)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.6)] sm:bottom-7 sm:right-7"
        >
          <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
