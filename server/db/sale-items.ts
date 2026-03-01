import type { Knex } from 'knex'
import db from './connection.js'

export async function createSaleItem(
  saleId: number,
  productId: number,
  quantity: number,
  retailCents: number,
  costCents: number,
  lineTotalCents: number,
  trx?: Knex.Transaction,
) {
  const connection = trx ?? db
  const [row] = await connection('sale_items')
    .insert({
      sale_id: saleId,
      product_id: productId,
      quantity,
      retail_cents: retailCents,
      cost_cents: costCents,
      line_total_cents: lineTotalCents,
    })
    .returning([
      'id',
      'sale_id as saleId',
      'product_id as productId',
      'quantity',
      'retail_cents as retailCents',
      'cost_cents as costCents',
      'line_total_cents as lineTotalCents',
      'created_at as createdAt',
      'updated_at as updatedAt',
    ])
  return row
}

export async function getSaleItemsForTotals(
  saleIds: number[],
  trx?: Knex.Transaction,
) {
  const connection = trx ?? db
  const rows = await connection('sale_items')
    .whereIn('sale_id', saleIds)
    .select(
      'sale_id as saleId',
      'quantity',
      'retail_cents as retailCents',
      'cost_cents as costCents',
      'line_total_cents as lineTotalCents',
    )
  return rows
}
