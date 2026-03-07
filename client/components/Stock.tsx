import { useQuery } from '@tanstack/react-query'
import { Minus, Plus } from 'lucide-react'
import { getProducts } from '@/client/apis/products'
import { getImagePath } from '@/lib/utils'
import { MoePanel } from './moe/MoePanel'
import { PriceDisplay } from './display/PriceDisplay'
import { ProductTile } from './product/ProductTile'

export default function Stock() {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['products', 1],
    queryFn: () => getProducts(1),
  })

  if (isPending) {
    return (
      <div className="mt-8 text-center text-moe-cream">Loading products...</div>
    )
  }

  if (isError) {
    return (
      <div className="mt-8 text-center text-moe-cream">
        Failed to load products. Please try again.
      </div>
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
            <PriceDisplay className="text-shadow-moe-mint-light min-w-[24rem] px-8 py-8 text-center text-6xl font-bold text-moe-mint-light">
              $100.00
            </PriceDisplay>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-center text-2xl font-bold uppercase text-moe-cream">
              YOU&apos;VE SPENT
            </p>
            <PriceDisplay className="text-shadow-moe-mint-light min-w-[24rem] px-8 py-8 text-center text-6xl font-bold text-moe-mint-light">
              $25.50
            </PriceDisplay>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {products?.map((product) => (
          <div key={product.id} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center text-moe-cream hover:opacity-80"
                aria-label={`Decrease ${product.productName}`}
              >
                <Minus className="h-5 w-5" strokeWidth={5} />
              </button>
              <button
                type="button"
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
            <p className="py-4 text-4xl font-bold text-moe-mint-light">0</p>
          </div>
        ))}
      </div>
    </div>
  )
}
