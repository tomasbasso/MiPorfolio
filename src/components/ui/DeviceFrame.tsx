import type { ReactNode } from 'react'
import { LockSimple } from '@phosphor-icons/react'

interface Props {
  variant: 'desktop' | 'browser' | 'phone'
  title?: string
  url?: string
  tone?: 'light' | 'dark'
  className?: string
  children: ReactNode
}

function WindowControls() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </div>
  )
}

export default function DeviceFrame({ variant, title, url, tone = 'light', className = '', children }: Props) {
  const shadow = tone === 'dark' ? 'shadow-frame-dark' : 'shadow-frame'

  if (variant === 'phone') {
    return (
      <div className={`relative rounded-[2.4rem] bg-[#0E1526] p-[7px] ${shadow} ${className}`}>
        <div className="relative overflow-hidden rounded-[1.95rem] bg-white">
          <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#0E1526]" aria-hidden="true" />
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-black/5 bg-white ${shadow} ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-[#E9EDF4] bg-[#F7F9FC] px-3.5">
        <WindowControls />
        {variant === 'browser' ? (
          <div className="mx-auto flex h-6 min-w-0 max-w-[70%] flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 text-[11px] text-[#5C667D] ring-1 ring-[#E3E8F1]">
            <LockSimple size={11} weight="bold" aria-hidden="true" />
            <span className="truncate">{url}</span>
          </div>
        ) : (
          <div className="mx-auto truncate pr-10 text-[11.5px] font-medium text-[#5C667D]">{title}</div>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
