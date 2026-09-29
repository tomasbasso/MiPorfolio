import { renderHook, act } from '@testing-library/react'
import { useLoop } from '../useLoop'

describe('useLoop', () => {
  it('avanza y vuelve a 0 solo mientras está activo', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ a }) => useLoop(3, 100, a), { initialProps: { a: true } })
    expect(result.current).toBe(0)
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe(1)
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe(0)
    rerender({ a: false })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe(0)
    vi.useRealTimers()
  })
})
