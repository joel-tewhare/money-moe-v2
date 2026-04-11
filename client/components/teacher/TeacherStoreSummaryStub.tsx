import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getImagePath } from '@/lib/utils'
import type { StoreSummary } from '@/models/store-summary'
import { MoePanel } from '../moe/MoePanel'

const FALLBACK_PRODUCT_IMAGE = '/assets/products/plate.png'

function formatCentsToDollars(cents: number | null | undefined): string {
  const value =
    typeof cents === 'number' && Number.isFinite(cents) ? Math.trunc(cents) : 0
  return `$${(value / 100).toFixed(2)}`
}

function SummaryMetricRow({ label, value }: { label: string; value: string }) {
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
  const totalRevenueCents =
    storeSummary.totalRevenueCents ??
    storeSummary.store.totalRevenueCents ??
    null
  const totalCostCents =
    storeSummary.totalCostCents ?? storeSummary.store.totalCostCents ?? null
  const profitCents =
    storeSummary.profitCents ?? storeSummary.store.profitCents ?? null

  const bestsellerName =
    typeof storeSummary.bestseller?.productName === 'string' &&
    storeSummary.bestseller.productName.trim().length > 0
      ? storeSummary.bestseller.productName.trim()
      : null

  const topEarnerName =
    typeof storeSummary.topEarner?.productName === 'string' &&
    storeSummary.topEarner.productName.trim().length > 0
      ? storeSummary.topEarner.productName.trim()
      : null

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

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 pt-6">
        <div className="flex w-full flex-col items-stretch gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
                <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                  Your bestseller
                </h2>
                {bestsellerName ? (
                  <>
                    <img
                      src={getImagePath(bestsellerName)}
                      alt=""
                      className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                      }}
                    />
                    <p className="text-center text-sm font-medium text-moe-slate">
                      {bestsellerName}
                    </p>
                  </>
                ) : (
                  <p className="text-center text-sm text-moe-slate/70">
                    No bestseller for this session.
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
                <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                  Your top earner
                </h2>
                {topEarnerName ? (
                  <>
                    <img
                      src={getImagePath(topEarnerName)}
                      alt=""
                      className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                      }}
                    />
                    <p className="text-center text-sm font-medium text-moe-slate">
                      {topEarnerName}
                    </p>
                  </>
                ) : (
                  <p className="text-center text-sm text-moe-slate/70">
                    No top earner for this session.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <SummaryMetricRow
                label="Total revenue"
                value={formatCentsToDollars(totalRevenueCents)}
              />
              <SummaryMetricRow
                label="Total cost"
                value={formatCentsToDollars(totalCostCents)}
              />
              <SummaryMetricRow
                label="Profit made"
                value={formatCentsToDollars(profitCents)}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <MoePanel className="flex flex-col gap-5 p-6 text-moe-cream">
              <div className="flex flex-row items-center gap-2">
                <ChevronLeft
                  className="h-6 w-6 shrink-0 text-moe-cream"
                  strokeWidth={2}
                  aria-hidden
                />
                <p className="min-w-0 flex-1 text-center text-sm">
                  AI Review and further breakdown of store session here in voice
                  of Moe here.
                </p>
                <ChevronRight
                  className="h-6 w-6 shrink-0 text-moe-cream"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
            </MoePanel>
          </div>
        </div>
      </div>
    </div>
  )
}
