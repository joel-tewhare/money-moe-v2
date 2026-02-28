import type { Knex } from 'knex'
import db from './connection.js'

export async function seedStoreStock(
  storeId: number,
  categoryId: number,
  trx?: Knex.Transaction
) {
  const conn = trx ?? db
  const products = await conn('products')
    .where('category_id', categoryId)
    .select('id', 'retail_cents')
  const now = new Date().toISOString()
  const rows = products.map((p: { id: number; retail_cents: number }) => ({
    store_id: storeId,
    product_id: p.id,
    quantity: 10,
    retail_cents: p.retail_cents,
    created_at: now,
    updated_at: now,
  }))
  if (rows.length > 0) {
    await conn('store_stock').insert(rows)
  }
}

export async function getStoreStockByStoreId(
  storeId: number,
  trx?: Knex.Transaction
) {
  const conn = trx ?? db
  const rows = await conn('store_stock')
    .join('products', 'store_stock.product_id', 'products.id')
    .where('store_stock.store_id', storeId)
    .select(
      'store_stock.product_id as productId',
      'products.product_name as productName',
      'store_stock.quantity',
      'store_stock.retail_cents as retailCents'
    )
  return rows
}

export async function getStockQuantity(
  storeId: number,
  productId: number,
  trx?: Knex.Transaction
) {
  const conn = trx ?? db
  const row = await conn('store_stock')
    .where({ store_id: storeId, product_id: productId })
    .select('quantity')
    .first()
  return row?.quantity ?? 0
}

export async function decrementStock(
  storeId: number,
  productId: number,
  quantity: number,
  trx?: Knex.Transaction
) {
  const conn = trx ?? db
  const now = new Date().toISOString()
  await conn('store_stock')
    .where({ store_id: storeId, product_id: productId })
    .decrement('quantity', quantity)
    .update('updated_at', now)
}
