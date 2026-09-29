import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  baseWidth: number
  baseHeight: number
  className?: string
  children: ReactNode
}

// Dibuja la pantalla a un tamaño fijo y la escala al ancho disponible, como una captura
export default function ScaledScreen({ baseWidth, baseHeight, className = '', children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth ? el.clientWidth / baseWidth : 1)
    update()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [baseWidth])

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${baseWidth} / ${baseHeight}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: baseWidth, height: baseHeight, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
