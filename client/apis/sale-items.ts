import request from 'superagent'
import type { SaleItem } from '@/models/sale-items'
import type { CreateSaleItemRequest } from '@/models/sale-items'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createSaleItem(
  data: CreateSaleItemRequest
): Promise<SaleItem> {
  const response = await request.post(`${rootURL}/sale-items`).send(data)
  return response.body
}
