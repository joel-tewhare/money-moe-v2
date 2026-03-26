import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getStoreSummary } from '@/client/apis/stores'
import { getImagePath } from '@/lib/utils'
import { MoePanel } from './moe/MoePanel'
import { ProductTile } from './product/ProductTile'
import type { StoreStockSummary } from '@/models/store-summary'

type CartLine = {
  productName: string
  retailCents: number
  quantity: number
}

export default function Pos() {
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0

  const [cart, setCart] = useState<Record<number, CartLine>>({})

  const {
    data: storeSummary,
    isPending: isStorePending,
    isError: isStoreError,
  } = useQuery({
    queryKey: ['storeSummary', storeIdNum],
    queryFn: () => getStoreSummary(storeIdNum),
    enabled: storeIdNum > 0,
  })

  const sellableItems = useMemo(
    () => storeSummary?.stock.filter((s) => s.quantity > 0) ?? [],
    [storeSummary?.stock],
  )

  const addProduct = (item: StoreStockSummary) => {
    const retailCents = item.retailCents ?? 0
    setCart((prev) => {
      const currentQty = prev[item.productId]?.quantity ?? 0
      if (currentQty >= item.quantity) {
        return prev
      }
      return {
        ...prev,
        [item.productId]: {
          productName: item.productName,
          retailCents,
          quantity: currentQty + 1,
        },
      }
    })
  }

  const removeOneUnit = (productId: number) => {
    setCart((prev) => {
      const line = prev[productId]
      if (!line) return prev
      if (line.quantity <= 1) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return {
        ...prev,
        [productId]: { ...line, quantity: line.quantity - 1 },
      }
    })
  }

  const cartEntries = useMemo(
    () =>
      Object.entries(cart).map(([productId, line]) => ({
        productId: Number(productId),
        ...line,
      })),
    [cart],
  )

  const totalCents = useMemo(
    () =>
      cartEntries.reduce(
        (sum, line) => sum + line.retailCents * line.quantity,
        0,
      ),
    [cartEntries],
  )

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

  if (isStorePending) {
    return <div className="mt-8 text-center text-moe-cream">Loading...</div>
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <div className="flex w-full max-w-6xl flex-col items-stretch justify-center gap-10 lg:flex-row lg:gap-14">
        <div className="flex max-h-[85vh] min-h-[32rem] flex-1 flex-col gap-5 lg:min-h-[52rem]">
          <div className="w-full shrink-0">
            <div className="border-dashed-moe-cream rounded-2xl p-16 lg:p-20">
              <div className="grid w-full grid-cols-3 justify-items-center gap-14 lg:gap-16">
                {sellableItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => addProduct(item)}
                      disabled={
                        (cart[item.productId]?.quantity ?? 0) >= item.quantity
                      }
                      className="flex flex-col items-center gap-2 rounded-2xl transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ProductTile className="flex h-36 w-36 flex-col items-center justify-start gap-2 rounded-2xl bg-moe-cream p-2">
                        <span className="rounded-full bg-moe-mint-light/60 px-3 py-1 text-sm font-medium text-moe-slate">
                          ${((item.retailCents ?? 0) / 100).toFixed(2)}
                        </span>
                        <img
                          src={getImagePath(item.productName)}
                          alt={item.productName}
                          className="h-24 w-24"
                        />
                      </ProductTile>
                    </button>
                    <p className="text-center text-sm text-moe-cream">
                      {item.productName} ({item.quantity})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end">
            <MoePanel className="flex w-full flex-row items-center gap-4 p-6 text-moe-cream">
              <img
                src="/assets/moe/moe-4.png"
                alt="Moe"
                className="h-44 w-auto max-w-[42%] shrink-0 object-contain sm:h-52"
              />
              <div className="flex min-w-0 flex-1 flex-row items-center gap-2">
                <ChevronLeft
                  className="h-6 w-6 shrink-0 text-moe-cream"
                  strokeWidth={2}
                  aria-hidden
                />
                <p className="text-sm">
                  Instructions and educational information goes here in the
                  voice of MOE. Arrows slide to more information.
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

        <div className="flex max-h-[85vh] min-h-[32rem] flex-1 flex-col lg:min-h-[52rem] lg:max-w-md">
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-moe-cream p-6 shadow-md">
            <p className="mb-6 shrink-0 text-center text-xl font-bold uppercase text-moe-slate">
              New Sale
            </p>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain">
              {cartEntries.length === 0 ? (
                <p className="text-center text-sm text-moe-slate/70">
                  Tap a product to add to this sale
                </p>
              ) : (
                cartEntries.map((line) => {
                  const lineTotalCents = line.retailCents * line.quantity
                  return (
                    <div
                      key={line.productId}
                      className="flex items-center gap-3 border-b border-moe-slate/10 pb-3 text-moe-slate"
                    >
                      <span className="min-w-0 flex-1 text-left font-medium">
                        {line.quantity} × {line.productName}
                      </span>
                      <span className="shrink-0 font-semibold">
                        ${(lineTotalCents / 100).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeOneUnit(line.productId)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-lg font-bold text-moe-slate hover:bg-moe-slate/10"
                        aria-label={`Remove one ${line.productName}`}
                      >
                        ×
                      </button>
                    </div>
                  )
                })
              )}
            </div>
            <div className="mt-6 flex shrink-0 items-center justify-between border-t-2 border-moe-slate/20 pt-4 font-bold text-moe-slate">
              <span>TOTAL</span>
              <span>${(totalCents / 100).toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="mt-6 w-full shrink-0 rounded-full bg-moe-mint py-4 text-lg font-bold uppercase text-moe-slate shadow-sm transition-colors hover:opacity-90"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
