import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getStoreSummary } from '@/client/apis/stores'
import { getImagePath } from '@/lib/utils'
import { MoePanel } from './moe/MoePanel'

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

export default function Summary() {
  const navigate = useNavigate()
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0

  const {
    data: storeSummary,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['storeSummary', storeIdNum],
    queryFn: () => getStoreSummary(storeIdNum),
    enabled: storeIdNum > 0,
  })

  if (storeIdNum <= 0) {
    return (
      <div className="mt-8 px-4 text-center text-moe-cream">
        Invalid store. Please start from the home page.
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="mt-8 px-4 text-center text-moe-cream">Loading...</div>
    )
  }

  if (isError || storeSummary == null) {
    return (
      <div className="mt-8 px-4 text-center text-moe-cream">
        Store summary could not be loaded. Please start from the home page.
      </div>
    )
  }

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
    <div className="mt-8 flex flex-col items-center gap-8 px-4 pb-12">
      <div className="flex w-full max-w-6xl flex-col items-stretch gap-10 lg:flex-row lg:gap-14">
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
                totalRevenueCents
                  ? formatCentsToDollars(totalRevenueCents)
                  : '—'
              }
            />
            <SummaryMetricRow
              label="Total cost"
              value={
                totalCostCents ? formatCentsToDollars(totalCostCents) : '—'
              }
            />
            <SummaryMetricRow
              label="Profit made"
              value={profitCents ? formatCentsToDollars(profitCents) : '—'}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <MoePanel className="flex flex-col gap-5 p-6 text-moe-cream">
            <img
              src="/assets/moe/moe-2.png"
              alt="Moe"
              className="mx-auto h-36 w-auto max-w-[min(100%,12rem)] object-contain sm:h-44"
            />
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

          <div className="border-dashed-moe-cream shrink-0 px-5 py-7 lg:px-7 lg:py-8">
            <div className="flex flex-row items-center justify-between gap-4">
              <p className="max-w-[min(16rem,58%)] text-left text-base font-medium leading-snug text-moe-cream lg:text-lg">
                Click here to close the dashboard
              </p>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="shrink-0 rounded-full bg-moe-mint px-6 py-3.5 text-center text-sm font-black uppercase tracking-wide text-moe-green shadow-sm transition-colors hover:opacity-90"
              >
                Return home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
