import type { Knex } from 'knex'
import db from './connection.js'

export async function getProducts(categoryId?: number, trx?: Knex.Transaction) {
  const connection = trx ?? db
  const query = connection('products').select(
    'id',
    'category_id as categoryId',
    'product_name as productName',
    'cost_cents as costCents',
    'retail_cents as retailCents',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )
  if (categoryId != null) {
    query.where('category_id', categoryId)
  }
  return query.orderBy('id')
}

export async function getProductById(id: number, trx?: Knex.Transaction) {
  const connection = trx ?? db
  const row = await connection('products')
    .where('id', id)
    .select(
      'id',
      'category_id as categoryId',
      'product_name as productName',
      'cost_cents as costCents',
      'retail_cents as retailCents',
      'created_at as createdAt',
      'updated_at as updatedAt',
    )
    .first()
  return row
}
