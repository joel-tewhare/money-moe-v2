import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MoePanel } from '@/client/components/moe/MoePanel'

type Props = {
  showMoeImage: boolean
  className?: string
}

export function StoreSummaryMoeReview({ showMoeImage, className }: Props) {
  return (
    <MoePanel
      className={cn('flex flex-col gap-5 p-6 text-moe-cream', className)}
    >
      {showMoeImage ? (
        <img
          src="/assets/moe/moe-2.png"
          alt="Moe"
          className="mx-auto h-36 w-auto max-w-[min(100%,12rem)] object-contain sm:h-44"
        />
      ) : null}
      <div className="flex flex-row items-center gap-2">
        <ChevronLeft
          className="h-6 w-6 shrink-0 text-moe-cream"
          strokeWidth={2}
          aria-hidden
        />
        <p className="min-w-0 flex-1 text-center text-sm">
          AI Review and further breakdown of store session here in voice of Moe
          here.
        </p>
        <ChevronRight
          className="h-6 w-6 shrink-0 text-moe-cream"
          strokeWidth={2}
          aria-hidden
        />
      </div>
    </MoePanel>
  )
}
