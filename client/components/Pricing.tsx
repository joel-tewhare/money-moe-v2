import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Minus, Plus } from 'lucide-react'
import { getProducts } from '@/client/apis/products'
import { getStoreSummary, patchStoreStockRetail } from '@/client/apis/stores'
import { getImagePath } from '@/lib/utils'
import { MoePanel } from './moe/MoePanel'
import { ProductTile } from './product/ProductTile'
import type { StoreStockSummary } from '@/models/store-summary'

type PricedItem = StoreStockSummary & { costCents: number }

function getPercentage(retailCents: number, costCents: number): number {
  if (costCents <= 0) return 0
  if (retailCents <= costCents) return 0
  return Math.round(((retailCents - costCents) / costCents) * 100)
}

export default function Pricing() {
  const navigate = useNavigate()
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0

  const [retailCents, setRetailCents] = useState<Record<number, number>>({})

  const {
    data: storeSummary,
    isPending: isStorePending,
    isError: isStoreError,
  } = useQuery({
    queryKey: ['storeSummary', storeIdNum],
    queryFn: () => getStoreSummary(storeIdNum),
    enabled: storeIdNum > 0,
  })

  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useQuery({
    queryKey: ['products', storeSummary?.store.categoryId],
    queryFn: () => getProducts(storeSummary!.store.categoryId),
    enabled: !!storeSummary?.store.categoryId,
  })

  const displayedItems = useMemo<PricedItem[]>(() => {
    if (!storeSummary?.stock || !products) return []
    return storeSummary.stock
      .filter((s) => s.quantity > 0)
      .map((s) => {
        const product = products.find((p) => p.id === s.productId)
        return {
          ...s,
          costCents: product?.costCents ?? 0,
        }
      })
      .filter((item) => item.costCents > 0)
  }, [storeSummary, products])

  const getCurrentRetail = (item: PricedItem) =>
    retailCents[item.productId] ?? item.costCents

  const handleDecrease = (productId: number, costCents: number) => {
    const current = retailCents[productId] ?? costCents
    const next = Math.max(costCents, current - 50)
    setRetailCents((prev) => ({ ...prev, [productId]: next }))
  }

  const handleIncrease = (productId: number, costCents: number) => {
    const current = retailCents[productId] ?? costCents
    setRetailCents((prev) => ({ ...prev, [productId]: current + 50 }))
  }

  const saveRetailMutation = useMutation({
    mutationFn: () =>
      patchStoreStockRetail(
        storeIdNum,
        displayedItems.map((item) => ({
          productId: item.productId,
          retailCents: retailCents[item.productId] ?? item.costCents,
        })),
      ),
    onSuccess: () => {
      navigate(`/store/${storeId}/finalise`)
    },
  })

  const isPending = isStorePending || isProductsPending

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
    return (
      <div className="mt-8 text-center text-moe-cream">Loading products...</div>
    )
  }

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="mb-14 flex flex-row items-stretch justify-center gap-14">
        <MoePanel className="flex max-h-[56rem] max-w-[28rem] flex-col justify-between p-6 text-moe-cream">
          <p className="text-sm">
            Instructions and educational information goes here in the voice of
            MOE. Arrows slide to more information.
          </p>
          <img
            src="/assets/moe/moe-3.png"
            alt="Moe"
            className="mt-4 h-64 w-2/3 object-contain"
          />
        </MoePanel>
        <div className="flex flex-col gap-8">
          <p className="text-center text-2xl font-bold uppercase text-moe-cream">
            RETAIL PRICES
          </p>
          <div className="mx-auto grid max-w-max grid-cols-2 justify-items-center gap-12">
            {isProductsError && (
              <p className="col-span-2 w-full text-center text-moe-cream">
                Failed to load products. Please try again.
              </p>
            )}
            {!isProductsError &&
              displayedItems.map((item) => {
                const currentRetail = getCurrentRetail(item)
                const percentage = getPercentage(currentRetail, item.costCents)
                return (
                  <div
                    key={item.productId}
                    className="flex flex-col items-center gap-2"
                  >
                    <ProductTile className="flex h-32 w-32 flex-col items-center justify-between rounded-2xl bg-moe-cream p-2">
                      <span className="rounded-full bg-moe-mint-light/60 px-3 py-1 text-sm font-medium text-moe-slate">
                        {percentage}%
                      </span>
                      <img
                        src={getImagePath(item.productName)}
                        alt={item.productName}
                        className="h-20 w-20"
                      />
                    </ProductTile>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleDecrease(item.productId, item.costCents)
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center text-moe-cream hover:opacity-80"
                        aria-label={`Decrease price for ${item.productName}`}
                      >
                        <Minus className="h-5 w-5" strokeWidth={5} />
                      </button>
                      <div className="min-w-[6rem] rounded-lg border-2 border-dashed border-moe-mint-light bg-moe-mint-light/30 px-3 py-2 text-center text-lg font-semibold text-moe-slate">
                        ${(currentRetail / 100).toFixed(2)}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleIncrease(item.productId, item.costCents)
                        }
                        className="flex h-8 w-8 cursor-pointer items-center justify-center text-moe-cream hover:opacity-80"
                        aria-label={`Increase price for ${item.productName}`}
                      >
                        <Plus className="h-5 w-5" strokeWidth={5} />
                      </button>
                    </div>
                    <p className="text-sm text-moe-cream">{item.productName}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {storeId && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => saveRetailMutation.mutate()}
            disabled={
              saveRetailMutation.isPending || displayedItems.length === 0
            }
            className="mr-8 w-fit rounded-md bg-moe-slate px-4 py-3 text-lg font-semibold text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90 disabled:opacity-50"
          >
            {saveRetailMutation.isPending ? 'Saving Prices' : 'Next: Summary'}
          </button>
        </div>
      )}
    </div>
  )
}
