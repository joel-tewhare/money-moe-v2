export async function seed(knex) {
  const t1 = '2026-02-26T08:10:00.000Z'
  const t3 = '2026-02-26T08:20:00.000Z'

  await knex('stores').insert([
    {
      id: 1,
      category_id: 1,
      participant_id: 1,
      started_at: t1,
      ended_at: t3,
      total_revenue_cents: 3250,
      total_cost_cents: 1400,
      profit_cents: 1850,
      created_at: t1,
      updated_at: t3,
    },
  ])
}
