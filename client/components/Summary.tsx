import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getStoreSummary } from '@/client/apis/stores'
import { StoreSummaryFigures } from './store-summary/StoreSummaryFigures'
import { StoreSummaryMoeReview } from './store-summary/StoreSummaryMoeReview'

export default function Summary() {
  const navigate = useNavigate()
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0

  const { data: storeSummary, isPending, isError } = useQuery({
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

  return (
    <div className="mt-8 flex flex-col items-center gap-8 px-4 pb-12">
      <div className="flex w-full max-w-6xl flex-col items-stretch gap-10 lg:flex-row lg:gap-14">
        <StoreSummaryFigures storeSummary={storeSummary} />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <StoreSummaryMoeReview showMoeImage />

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
