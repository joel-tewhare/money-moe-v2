import type { StoreSummary } from '@/models/store-summary'
import { getImagePath } from '@/lib/utils'

const FALLBACK_PRODUCT_IMAGE = '/assets/products/plate.png'

function formatCentsToDollars(cents: number | null | undefined): string {
  const num =
    typeof cents === 'number' && Number.isFinite(cents) ? Math.trunc(cents) : 0
  return `$${(num / 100).toFixed(2)}`
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
  storeSummary: StoreSummary
}

export function StoreSummaryFigures({ storeSummary }: Props) {
  const totalRevenueCents =
    storeSummary.totalRevenueCents ??
    storeSummary.store.totalRevenueCents ??
    null
  const totalCostCents =
    storeSummary.totalCostCents ?? storeSummary.store.totalCostCents ?? null
  const profitCents =
    storeSummary.profitCents ?? storeSummary.store.profitCents ?? null

  const bestseller = storeSummary.bestseller
  const topEarner = storeSummary.topEarner

  const bestsellerName =
    bestseller != null &&
    typeof bestseller.productName === 'string' &&
    bestseller.productName.trim().length > 0
      ? bestseller.productName.trim()
      : null
  const topEarnerName =
    topEarner != null &&
    typeof topEarner.productName === 'string' &&
    topEarner.productName.trim().length > 0
      ? topEarner.productName.trim()
      : null

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
          <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
            Your bestseller
          </h2>
          {bestseller != null && bestsellerName != null ? (
            <>
              <img
                src={getImagePath(bestsellerName)}
                alt=""
                className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
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
          {topEarner != null && topEarnerName != null ? (
            <>
              <img
                src={getImagePath(topEarnerName)}
                alt=""
                className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
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
          value={
            totalRevenueCents ? formatCentsToDollars(totalRevenueCents) : '—'
          }
        />
        <SummaryMetricRow
          label="Total cost"
          value={totalCostCents ? formatCentsToDollars(totalCostCents) : '—'}
        />
        <SummaryMetricRow
          label="Profit made"
          value={profitCents ? formatCentsToDollars(profitCents) : '—'}
        />
      </div>
    </div>
  )
}
