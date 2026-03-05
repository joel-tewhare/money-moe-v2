import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export function ProductTile({ children, className }: Props) {
  return (
    <div className={cn('bg-moe-cream rounded-2xl shadow-md', className)}>
      {children}
    </div>
  )
}
