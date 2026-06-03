import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        background: 'var(--grad)',
        transform: `scaleX(${progress})`,
        transition: 'transform 0.1s linear',
      }}
      aria-hidden="true"
    />
  )
}
