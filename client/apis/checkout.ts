import request from 'superagent'
import type { CheckoutRequest } from '@/models/checkout'
import type { CheckoutResponse } from '@/models/checkout'

const rootURL = new URL('/api/v1', document.baseURI)

export async function checkout(
  data: CheckoutRequest,
): Promise<CheckoutResponse> {
  const response = await request
    .post(`${rootURL}/checkout`)
    .send(data)
  return response.body
}
