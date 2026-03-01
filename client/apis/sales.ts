import request from 'superagent'
import type { Sale } from '@/models/sales'
import type { CreateSaleRequest } from '@/models/sales'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createSale(data: CreateSaleRequest): Promise<Sale> {
  const response = await request.post(`${rootURL}/sales`).send(data)
  return response.body
}
