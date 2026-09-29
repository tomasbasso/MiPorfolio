import type { ReactNode } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { waLink } from '../../lib/whatsapp'

interface Props {
  mensaje?: string
  children: ReactNode
  variant?: 'primary' | 'light' | 'outline'
  size?: 'md' | 'lg'
  className?: string
}

const variants = {
  primary:
    'bg-brand text-white shadow-[0_10px_24px_-10px_rgba(10,96,254,0.7)] hover:bg-[#0554E6] hover:shadow-[0_14px_30px_-10px_rgba(10,96,254,0.75)]',
  light: 'bg-white text-ink hover:bg-[#EEF3FF]',
  outline: 'border border-line-light bg-white text-ink hover:border-brand/40 hover:text-brand',
}

const sizes = {
  md: 'h-11 px-5 text-[0.95rem] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
}

export default function WhatsAppButton({ mensaje, children, variant = 'primary', size = 'md', className = '' }: Props) {
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-[background-color,box-shadow,transform,color,border-color] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsappLogo size={size === 'lg' ? 22 : 19} weight="fill" aria-hidden="true" />
      <span>{children}</span>
    </a>
  )
}
