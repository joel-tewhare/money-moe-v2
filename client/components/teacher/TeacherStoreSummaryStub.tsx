import { Button } from '@/components/ui/button'
import type { StoreSummary } from '@/models/store-summary'
import { StoreSummaryFigures } from '@/client/components/store-summary/StoreSummaryFigures'
import { StoreSummaryMoeReview } from '@/client/components/store-summary/StoreSummaryMoeReview'

type Props = {
  onBack: () => void
  storeIdLabel: string
  studentName: string
  storeSummary: StoreSummary
}

export function TeacherStoreSummaryStub({
  onBack,
  storeIdLabel,
  studentName,
  storeSummary,
}: Props) {
  return (
    <div
      className="flex min-h-[14rem] w-full flex-1 flex-col rounded-xl border border-moe-cream/25 bg-moe-cream/5 lg:min-h-0 lg:max-h-[min(70vh,40rem)]"
      aria-labelledby="teacher-summary-stub-title"
    >
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-moe-cream/20 px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-moe-cream hover:bg-moe-cream/10 hover:text-moe-cream"
          aria-label="Clear selection and return to the ended list"
        >
          Back
        </Button>
        <div className="min-w-0 text-right">
          <h1
            id="teacher-summary-stub-title"
            className="truncate text-base font-bold text-moe-cream"
          >
            {studentName}
          </h1>
          <p className="truncate text-xs text-moe-cream/80">{storeIdLabel}</p>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-5">
        <div className="flex w-full flex-col items-stretch gap-10">
          <StoreSummaryFigures storeSummary={storeSummary} />
          <StoreSummaryMoeReview showMoeImage={false} />
        </div>
      </div>
    </div>
  )
}
