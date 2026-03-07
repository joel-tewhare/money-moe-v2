import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function PriceDisplay({ children, className }: Props) {
  return (
    <div
      className={cn(
        'border-2 border-dashed border-moe-cream rounded-2xl px-6 py-2 text-xl font-semibold text-moe-cream',
        className
      )}
    >
      {children}
    </div>
  )
}
