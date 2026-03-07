import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function MoePanel({ children, className }: Props) {
  return (
    <div
      className={cn(
        'bg-moe-slate border-2 border-moe-cream rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  )
}
