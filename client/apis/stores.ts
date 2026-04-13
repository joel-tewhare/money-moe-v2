import request from 'superagent'
import type { Store, TeacherClassStore } from '@/models/stores'
import type { StoreSummary } from '@/models/store-summary'
import type { CreateStoreRequest } from '@/models/stores'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createStore(data: CreateStoreRequest): Promise<Store> {
  const response = await request.post(`${rootURL}/stores`).send(data)
  return response.body
}

export async function endStore(storeId: number): Promise<Store> {
  const response = await request.post(`${rootURL}/stores/${storeId}/end`)
  return response.body
}

export async function getStoreSummary(storeId: number): Promise<StoreSummary> {
  const response = await request.get(`${rootURL}/stores/${storeId}/summary`)
  return response.body
}

export async function getTeacherClassStores(
  classCode: string,
): Promise<TeacherClassStore[]> {
  const response = await request.get(`${rootURL}/stores/class/${classCode}`)
  return response.body
}

export async function patchStoreStock(
  storeId: number,
  quantities: Record<number, number>,
): Promise<{ ok: boolean }> {
  const response = await request
    .patch(`${rootURL}/stores/${storeId}/stock`)
    .send({ quantities })
  return response.body
}

export async function patchStoreStockRetail(
  storeId: number,
  items: Array<{ productId: number; retailCents: number }>,
): Promise<{ ok: boolean }> {
  const response = await request
    .patch(`${rootURL}/stores/${storeId}/stock/retail`)
    .send({ items })
  return response.body
}
