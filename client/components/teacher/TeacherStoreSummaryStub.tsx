import { Button } from '@/components/ui/button'
import { MoePanel } from '../moe/MoePanel'

function EndedListRows({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full bg-moe-cream px-5 py-4 shadow-sm">
      <span className="text-sm font-bold uppercase tracking-wide text-moe-slate lg:text-base">
        {label}
      </span>
      <span className="shrink-0 rounded-full bg-moe-mint px-4 py-2 text-sm font-bold tabular-nums text-moe-green lg:text-base">
        {value}
      </span>
    </div>
  )
}

type Props = {
  onBack: () => void
  storeIdPlaceholder?: string
  studentNamePlaceholder?: string
}

export function TeacherStoreSummaryStub({ onBack }: Props) {
  return (
    <div
      className="flex min-h-0 flex-col rounded-xl border border-moe-cream/25 bg-moe-cream/5"
      aria-labelledby="teacher-summary-stub-title"
    >
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-moe-cream/20 px-4 py-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-moe-cream hover:bg-moe-cream/10 hover:text-moe-cream"
        >
          Back
        </Button>
        <div className="min-w-0">
          <h1
            id="teacher-summary-stub-title"
            className="truncate text-base font-bold text-moe-cream"
          >
            Store summary (preview)
          </h1>
          <p className="truncate text-xs text-moe-cream/80">
            Placeholder detail view
          </p>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 pt-6">
        <div className="flex w-full flex-col items-stretch gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
                <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                  Product highlights
                </h2>
                <p className="text-center text-sm text-moe-slate/70">
                  Placeholder bestseller
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
                <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                  Top earner
                </h2>
                <p className="text-center text-sm text-moe-slate/70">
                  Placeholder top earner
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <EndedListRows label="Total revenue" value="$0.00" />
              <EndedListRows label="Total cost" value="$0.00" />
              <EndedListRows label="Profit made" value="$0.00" />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <MoePanel className="flex flex-col gap-5 p-6 text-moe-cream">
              <p className="text-center text-sm text-moe-cream/90">
                Placeholder: student post-end narrative / review area.
              </p>
            </MoePanel>
          </div>
        </div>
      </div>
    </div>
  )
}
