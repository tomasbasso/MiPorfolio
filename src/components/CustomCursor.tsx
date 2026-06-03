import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf: number
    let x = -100, y = -100
    let tx = -100, ty = -100

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => dotRef.current?.classList.add('scale-[3]')
    const onLeave = () => dotRef.current?.classList.remove('scale-[3]')

    window.addEventListener('mousemove', onMove)
    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-150 hidden md:block"
      style={{ background: 'var(--neon-cyan)', opacity: 0.7, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
