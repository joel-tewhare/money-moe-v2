import request from 'superagent'
import type { Product } from '@/models/products'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getProducts(categoryId?: number): Promise<Product[]> {
  const url = new URL(`${rootURL}/products`)
  if (categoryId != null) {
    url.searchParams.set('categoryId', String(categoryId))
  }
  const response = await request.get(url.toString())
  return response.body
}
