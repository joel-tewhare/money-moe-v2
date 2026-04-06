import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MoePanel } from './moe/MoePanel'

const PLACEHOLDER_TOTALS = {
  revenue: '$100.00',
  cost: '$33.00',
  profit: '$67.00',
} as const

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

  return (
    <div className="mt-8 flex flex-col items-center gap-8 px-4 pb-12">
      <div className="flex w-full max-w-6xl flex-col items-stretch gap-10 lg:flex-row lg:gap-14">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
              <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                Your bestseller
              </h2>
              <img
                src="/assets/products/cupcake.png"
                alt=""
                className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              />
              <p className="text-center text-sm font-medium text-moe-slate">
                Cupcake
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-moe-cream p-5 shadow-md lg:p-6">
              <h2 className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-moe-slate sm:text-sm">
                Your top earner
              </h2>
              <img
                src="/assets/products/sandwich.png"
                alt=""
                className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              />
              <p className="text-center text-sm font-medium text-moe-slate">
                Sandwich
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SummaryMetricRow
              label="Total revenue"
              value={PLACEHOLDER_TOTALS.revenue}
            />
            <SummaryMetricRow
              label="Total cost"
              value={PLACEHOLDER_TOTALS.cost}
            />
            <SummaryMetricRow
              label="Profit made"
              value={PLACEHOLDER_TOTALS.profit}
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
