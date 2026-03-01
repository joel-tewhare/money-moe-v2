import request from 'superagent'
import type { ProductCategory } from '@/models/product-categories'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await request.get(`${rootURL}/product-categories`)
  return response.body
}
