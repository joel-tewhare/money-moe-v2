import type { Knex } from 'knex'
import db from './connection.js'

export async function createStore(
  categoryId: number,
  participantId: number,
  trx?: Knex.Transaction,
) {
  const connection = trx ?? db
  const now = new Date().toISOString()
  const [row] = await connection('stores')
    .insert({
      category_id: categoryId,
      participant_id: participantId,
      started_at: now,
      total_revenue_cents: 0,
      total_cost_cents: 0,
      profit_cents: 0,
    })
    .returning([
      'id',
      'category_id as categoryId',
      'participant_id as participantId',
      'started_at as startedAt',
      'ended_at as endedAt',
      'total_revenue_cents as totalRevenueCents',
      'total_cost_cents as totalCostCents',
      'profit_cents as profitCents',
      'created_at as createdAt',
      'updated_at as updatedAt',
    ])
  return row
}

export async function getStoreById(id: number, trx?: Knex.Transaction) {
  const connection = trx ?? db
  const row = await connection('stores')
    .where('id', id)
    .select(
      'id',
      'category_id as categoryId',
      'participant_id as participantId',
      'started_at as startedAt',
      'ended_at as endedAt',
      'total_revenue_cents as totalRevenueCents',
      'total_cost_cents as totalCostCents',
      'profit_cents as profitCents',
      'created_at as createdAt',
      'updated_at as updatedAt',
    )
    .first()
  return row
}

export async function getStoresByClassId(
  classId: number,
  trx?: Knex.Transaction,
) {
  const connection = trx ?? db
  const rows = await connection('stores')
    .join('participants', 'stores.participant_id', 'participants.id')
    .join('product_categories', 'stores.category_id', 'product_categories.id')
    .where('participants.class_id', classId)
    .select(
      'stores.id as storeId',
      'stores.ended_at as endedAt',
      'participants.display_name as studentName',
      'product_categories.name as storeName',
    )
  return rows
}

export async function updateStoreTotals(
  id: number,
  totals: {
    totalRevenueCents: number
    totalCostCents: number
    profitCents: number
  },
  endedAt: string,
  trx?: Knex.Transaction,
) {
  const connection = trx ?? db
  await connection('stores').where('id', id).update({
    total_revenue_cents: totals.totalRevenueCents,
    total_cost_cents: totals.totalCostCents,
    profit_cents: totals.profitCents,
    ended_at: endedAt,
    updated_at: endedAt,
  })
}
