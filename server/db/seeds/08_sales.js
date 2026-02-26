export async function seed(knex) {
  const t2 = '2026-02-26T08:12:00.000Z'

  await knex('sales').insert([
    {
      id: 1,
      store_id: 1,
      sold_at: t2,
      created_at: t2,
      updated_at: t2,
    },
  ])
}
