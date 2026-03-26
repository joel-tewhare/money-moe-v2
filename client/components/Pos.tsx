import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { checkout } from '@/client/apis/checkout'
import { endStore, getStoreSummary } from '@/client/apis/stores'
import { getApiErrorMessage, getImagePath } from '@/lib/utils'
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
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [cart, setCart] = useState<Record<number, CartLine>>({})
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [closeStoreModalOpen, setCloseStoreModalOpen] = useState(false)
  const [closeStoreError, setCloseStoreError] = useState<string | null>(null)

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
    setCheckoutError(null)
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
    setCheckoutError(null)
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

  const checkoutMutation = useMutation({
    mutationFn: () =>
      checkout({
        storeId: storeIdNum,
        items: cartEntries.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      }),
    onSuccess: () => {
      setCheckoutError(null)
      setCart({})
      void queryClient.invalidateQueries({
        queryKey: ['storeSummary', storeIdNum],
      })
    },
    onError: (err: unknown) => {
      setCheckoutError(
        getApiErrorMessage(err, 'Checkout failed. Please try again.'),
      )
    },
  })

  const closeStoreMutation = useMutation({
    mutationFn: () => endStore(storeIdNum),
    onSuccess: () => {
      setCloseStoreError(null)
      setCloseStoreModalOpen(false)
      navigate(`/store/${storeId}/summary`)
    },
    onError: (err: unknown) => {
      setCloseStoreModalOpen(false)
      setCloseStoreError(
        getApiErrorMessage(err, 'Could not close the store. Please try again.'),
      )
    },
  })

  const handleCheckout = () => {
    if (cartEntries.length === 0) {
      setCheckoutError('Add at least one item to the cart before checking out.')
      return
    }
    setCheckoutError(null)
    checkoutMutation.mutate()
  }

  const openCloseStoreModal = () => {
    setCloseStoreError(null)
    setCloseStoreModalOpen(true)
  }

  const cancelCloseStore = () => {
    if (!closeStoreMutation.isPending) {
      setCloseStoreModalOpen(false)
    }
  }

  const confirmCloseStore = () => {
    closeStoreMutation.mutate()
  }

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
          <div className="mb-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-moe-cream p-5 shadow-md">
            <p className="mb-4 shrink-0 text-center text-xl font-bold uppercase text-moe-slate">
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
            <div className="mt-4 flex shrink-0 items-center justify-between border-t-2 border-moe-slate/20 pt-3 font-bold text-moe-slate">
              <span>TOTAL</span>
              <span>${(totalCents / 100).toFixed(2)}</span>
            </div>
            <div className="mt-2 min-h-[3rem] shrink-0 text-center text-sm font-medium text-red-700">
              {checkoutError}
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending}
              className="mx-auto mb-1 mt-1 w-auto shrink-0 rounded-full bg-moe-mint px-10 py-5 text-4xl font-black uppercase leading-tight text-moe-slate shadow-sm transition-colors hover:opacity-90 disabled:opacity-50"
            >
              {checkoutMutation.isPending ? 'Checking out' : 'Checkout'}
            </button>
          </div>

          <div className="border-dashed-moe-cream shrink-0 px-6 py-8 lg:px-8 lg:py-10">
            <div className="flex flex-row items-center justify-between gap-5">
              <p className="max-w-[min(16rem,58%)] text-left text-base font-medium leading-snug text-moe-cream lg:text-lg">
                Finished selling?
                <br />
                Click this button
              </p>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={openCloseStoreModal}
                  disabled={closeStoreMutation.isPending}
                  className="rounded-full bg-moe-mint px-6 py-3.5 text-center text-sm font-black uppercase tracking-wide text-moe-green shadow-sm transition-colors hover:opacity-90 disabled:opacity-50"
                >
                  {closeStoreMutation.isPending ? 'Closing' : 'Close store'}
                </button>
                {closeStoreError ? (
                  <p className="max-w-[12rem] text-right text-sm font-medium text-moe-slate">
                    {closeStoreError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {closeStoreModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            disabled={closeStoreMutation.isPending}
            onClick={cancelCloseStore}
            className="absolute inset-0 bg-moe-slate/55 backdrop-blur-md transition-opacity disabled:pointer-events-none"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="close-store-dialog-title"
            className="relative z-10 w-full max-w-md rounded-2xl border-4 border-moe-mint bg-moe-cream p-8 shadow-xl"
          >
            <h2
              id="close-store-dialog-title"
              className="text-center text-lg font-bold text-moe-slate"
            >
              Are you sure you want to close your store?
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <button
                type="button"
                onClick={confirmCloseStore}
                disabled={closeStoreMutation.isPending}
                className="rounded-full bg-moe-mint px-8 py-3 text-sm font-black uppercase text-moe-slate shadow-sm transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {closeStoreMutation.isPending ? 'Closing…' : 'Yes'}
              </button>
              <button
                type="button"
                onClick={cancelCloseStore}
                disabled={closeStoreMutation.isPending}
                className="rounded-full border-2 border-moe-slate/30 bg-moe-cream px-8 py-3 text-sm font-bold uppercase text-moe-slate transition-colors hover:bg-moe-slate/5 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
