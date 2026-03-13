import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Minus, Plus } from 'lucide-react'
import { getProductCategories } from '@/client/apis/product-categories'
import { getProducts } from '@/client/apis/products'
import { getStoreSummary } from '@/client/apis/stores'
import { getImagePath } from '@/lib/utils'
import { MoePanel } from './moe/MoePanel'
import { PriceDisplay } from './display/PriceDisplay'
import { ProductTile } from './product/ProductTile'

export default function Stock() {
  const { storeId } = useParams<{ storeId: string }>()
  const storeIdNum = storeId ? Number(storeId) : 0

  const [quantities, setQuantities] = useState<Record<number, number>>({})

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
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['productCategories'],
    queryFn: getProductCategories,
  })

  const {
    data: products,
    isPending: isProductsPending,
    isError,
  } = useQuery({
    queryKey: ['products', storeSummary?.store.categoryId],
    queryFn: () => getProducts(storeSummary!.store.categoryId),
    enabled: !!storeSummary?.store.categoryId,
  })

  const category = categories?.find(
    (c) => c.id === storeSummary?.store.categoryId,
  )
  const budgetCents = category?.budgetCents ?? 0

  const totalSpentCents =
    products?.reduce(
      (sum, p) => sum + p.costCents * (quantities[p.id] ?? 0),
      0,
    ) ?? 0

  const handleIncrease = (productId: number) => {
    const product = products?.find((p) => p.id === productId)
    if (!product) return
    const currentQty = quantities[productId] ?? 0
    const nextTotal = totalSpentCents + product.costCents
    if (nextTotal <= budgetCents) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQty + 1,
      }))
    }
  }

  const handleDecrease = (productId: number) => {
    const currentQty = quantities[productId] ?? 0
    if (currentQty > 0) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQty - 1,
      }))
    }
  }

  const isPending = isStorePending || isProductsPending || isCategoriesPending

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
        <MoePanel className="flex max-h-[28rem] max-w-[28rem] flex-col justify-between p-6 text-moe-cream">
          <p className="text-sm">
            Instructions and educational information goes here in the voice of
            MOE. Arrows slide to more information.
          </p>
          <img
            src="/assets/moe/moe-2.png"
            alt="Moe"
            className="mt-4 h-64 w-2/3 object-contain"
          />
        </MoePanel>
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-center text-2xl font-bold uppercase text-moe-cream">
              BUDGET
            </p>
            {isCategoriesError && (
              <p className="text-center text-moe-cream">
                Failed to load categories. Please try again.
              </p>
            )}
            {!isCategoriesError && category?.budgetCents == null && (
              <p className="text-center text-moe-cream">
                No budget found. Please try again.
              </p>
            )}
            {!isCategoriesError && category?.budgetCents != null && (
              <PriceDisplay className="text-shadow-moe-mint-light min-w-[24rem] px-8 py-8 text-center text-6xl font-bold text-moe-mint-light">
                ${(category.budgetCents / 100).toFixed(2)}
              </PriceDisplay>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-center text-2xl font-bold uppercase text-moe-cream">
              YOU&apos;VE SPENT
            </p>
            <PriceDisplay className="text-shadow-moe-mint-light min-w-[24rem] px-8 py-8 text-center text-6xl font-bold text-moe-mint-light">
              ${(totalSpentCents / 100).toFixed(2)}
            </PriceDisplay>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {isError && (
          <p className="w-full text-center text-moe-cream">
            Failed to load products. Please try again.
          </p>
        )}
        {!isError &&
          products?.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDecrease(product.id)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center text-moe-cream hover:opacity-80"
                  aria-label={`Decrease ${product.productName}`}
                >
                  <Minus className="h-5 w-5" strokeWidth={5} />
                </button>
                <button
                  type="button"
                  onClick={() => handleIncrease(product.id)}
                  className="flex h-8 w-8 items-center justify-center text-moe-cream hover:opacity-80"
                  aria-label={`Increase ${product.productName}`}
                >
                  <Plus className="h-5 w-5" strokeWidth={5} />
                </button>
              </div>
              <ProductTile className="flex h-32 w-32 flex-col items-center justify-between rounded-2xl bg-moe-cream p-2">
                <p className="text-sm text-black">
                  ${(product.costCents / 100).toFixed(2)}
                </p>
                <img
                  src={getImagePath(product.productName)}
                  alt={product.productName}
                  className="h-20 w-20"
                />
              </ProductTile>
              <p className="text-sm text-moe-cream">{product.productName}</p>
              <p className="py-4 text-4xl font-bold text-moe-mint-light">
                {quantities[product.id] ?? 0}
              </p>
            </div>
          ))}
      </div>
      {storeId && (
        <div className="mt-8 flex justify-end">
          <Link
            to={`/store/${storeId}/pricing`}
            className="mr-8 w-fit rounded-md bg-moe-slate px-4 py-3 text-lg font-semibold text-moe-cream shadow-sm transition-colors hover:bg-moe-slate/90"
          >
            Next: Pricing
          </Link>
        </div>
      )}
    </div>
  )
}
