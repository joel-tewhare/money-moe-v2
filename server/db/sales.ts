import type { Knex } from 'knex'
import db from './connection.js'

export async function getSalesByStoreId(storeId: number, trx?: Knex.Transaction) {
  const conn = trx ?? db
  const rows = await conn('sales').where('store_id', storeId).select('id')
  return rows
}

export async function getSaleStoreId(saleId: number, trx?: Knex.Transaction) {
  const conn = trx ?? db
  const row = await conn('sales').where('id', saleId).select('store_id').first()
  return row?.store_id ?? null
}

export async function createSale(storeId: number, trx?: Knex.Transaction) {
  const conn = trx ?? db
  const now = new Date().toISOString()
  const [row] = await conn('sales')
    .insert({
      store_id: storeId,
      sold_at: now,
    })
    .returning([
      'id',
      'store_id as storeId',
      'sold_at as soldAt',
      'created_at as createdAt',
      'updated_at as updatedAt',
    ])
  return row
}
