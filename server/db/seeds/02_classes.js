export async function seed(knex) {
  const t0 = '2026-02-26T08:00:00.000Z'

  await knex('classes').insert([
    { id: 1, code: 'KAI123', owner_user_id: 1, created_at: t0, updated_at: t0 },
    { id: 2, code: 'MOE456', owner_user_id: null, created_at: t0, updated_at: t0 },
    { id: 3, code: 'POS789', owner_user_id: 2, created_at: t0, updated_at: t0 },
    { id: 4, code: 'FUN321', owner_user_id: null, created_at: t0, updated_at: t0 },
    { id: 5, code: 'BUD654', owner_user_id: null, created_at: t0, updated_at: t0 },
  ])
}
