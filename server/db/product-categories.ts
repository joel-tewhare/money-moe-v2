import type { Knex } from 'knex'
import db from './connection.js'

export async function getProductCategories(trx?: Knex.Transaction) {
  const connection = trx ?? db
  const rows = await connection('product_categories')
    .select(
      'id',
      'slug',
      'name',
      'budget_cents as budgetCents',
      'created_at as createdAt',
      'updated_at as updatedAt',
    )
    .orderBy('id')
  return rows
}
