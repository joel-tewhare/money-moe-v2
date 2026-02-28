import type { Knex } from 'knex'
import db from './connection.js'

export async function getClassIdByCode(code: string, trx?: Knex.Transaction) {
  const conn = trx ?? db
  const row = await conn('classes').where('code', code).select('id').first()
  return row?.id ?? null
}

export async function createParticipant(
  displayName: string,
  classId: number | null,
  trx?: Knex.Transaction
) {
  const conn = trx ?? db
  const [row] = await conn('participants')
    .insert({
      display_name: displayName,
      class_id: classId,
    })
    .returning(['id', 'class_id as classId', 'display_name as displayName', 'created_at as createdAt', 'updated_at as updatedAt'])
  return row
}
