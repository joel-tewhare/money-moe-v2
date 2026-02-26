export async function seed(knex) {
  const t0 = '2026-02-26T08:00:00.000Z'

  await knex('product_categories').insert([
    {
      id: 1,
      slug: 'food-drink',
      name: 'Food & Drink',
      budget_cents: 10000,
      created_at: t0,
      updated_at: t0,
    },
  ])
}
