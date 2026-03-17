import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductCategories } from '@/client/apis/product-categories'
import { getParticipant } from '@/client/apis/participants'
import { getStoreSummary } from '@/client/apis/stores'
import { getImagePath } from '@/lib/utils'
import { ProductTile } from './product/ProductTile'
import { StoreStockSummary } from '@/models/store-summary'

export default function Finalise() {
  const navigate = useNavigate()
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0
  const [priceError, setPriceError] = useState<string | null>(null)

  const {
    data: storeSummary,
    isPending: isStorePending,
    isError: isStoreError,
  } = useQuery({
    queryKey: ['storeSummary', storeIdNum],
    queryFn: () => getStoreSummary(storeIdNum),
    enabled: storeIdNum > 0,
  })

  const { data: categories, isPending: isCategoriesPending } = useQuery({
    queryKey: ['productCategories'],
    queryFn: getProductCategories,
  })

  const { data: participant, isPending: isParticipantPending } = useQuery({
    queryKey: ['participant', storeSummary?.store.participantId],
    queryFn: () => getParticipant(storeSummary!.store.participantId),
    enabled: !!storeSummary?.store.participantId,
  })

  const category = categories?.find(
    (c) => c.id === storeSummary?.store.categoryId,
  )
  const stockItems = storeSummary?.stock.filter((s) => s.quantity > 0) ?? []

  const getRetailCents = (item: StoreStockSummary) => item.retailCents

  const handleOpenStore = () => {
    const hasMissingPrice = stockItems.some((item) => item.retailCents == null)
    if (hasMissingPrice) {
      setPriceError('Please set all prices before opening the store.')
      return
    }
    setPriceError(null)
    navigate(`/store/${storeId}/pos`)
  }

  const handleBackToSetup = () => {
    navigate(`/store/${storeId}/pricing`)
  }

  const isPending =
    isStorePending ||
    isCategoriesPending ||
    (!!storeSummary?.store.participantId && isParticipantPending)

  if (storeIdNum <= 0) {
    return (
      <div className="mt-8 text-center text-moe-cream">
        Invalid store. Please start from the home page.
      </div>
    )
  }

  if (isStoreError) {
    return (
      <div className="mt-8 text-center text-moe-cream">
        Store not found. Please start from the home page.
      </div>
    )
  }

  if (isPending) {
    return <div className="mt-8 text-center text-moe-cream">Loading...</div>
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <p className="text-center text-2xl font-bold uppercase text-moe-cream">
        Welcome to {participant?.displayName ?? '…'}&apos;s{' '}
        {category?.name ?? '…'} store
      </p>
      {priceError && <p className="text-center text-moe-cream">{priceError}</p>}
      <div className="flex w-fit flex-col gap-8">
        <div className="border-dashed-moe-cream rounded-2xl p-12">
          <div className="grid max-w-max grid-cols-3 justify-items-center gap-12">
            {stockItems.map((item) => {
              const price = getRetailCents(item)
              return (
                <div
                  key={item.productId}
                  className="flex flex-col items-center gap-2"
                >
                  <ProductTile className="flex h-32 w-32 flex-col items-center justify-start gap-2 rounded-2xl bg-moe-cream p-2">
                    <span className="rounded-full bg-moe-mint-light/60 px-3 py-1 text-sm font-medium text-moe-slate">
                      ${((price ?? 0) / 100).toFixed(2)}
                    </span>
                    <img
                      src={getImagePath(item.productName)}
                      alt={item.productName}
                      className="h-20 w-20"
                    />
                  </ProductTile>
                  <p className="text-center text-sm text-moe-cream">
                    {item.productName} ({item.quantity})
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex w-full gap-4">
          <button
            type="button"
            onClick={handleBackToSetup}
            className="flex w-1/3 items-center justify-center rounded-md bg-moe-mint px-4 py-6 text-xl font-bold text-moe-green shadow-sm transition-colors hover:opacity-90"
          >
            <span className="text-center">
              &lt; BACK TO
              <br />
              SETUP
            </span>
          </button>
          <button
            type="button"
            onClick={handleOpenStore}
            className="flex w-2/3 items-center justify-center rounded-2xl border border-moe-cream bg-moe-slate px-4 py-6 text-4xl font-black text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90"
          >
            OPEN STORE
          </button>
        </div>
      </div>
    </div>
  )
}
