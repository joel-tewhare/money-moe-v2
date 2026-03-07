import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/client/apis/products'
import { getImagePath } from '@/lib/utils'
import { ProductTile } from './product/ProductTile'

export default function Stock() {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['products', 1], //categoryId hardcoded for now
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
    <div className="mt-8 flex flex-wrap justify-center gap-8">
      {products?.map((product) => (
        <div key={product.id} className="flex flex-col items-center gap-2">
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
        </div>
      ))}
    </div>
  )
}
