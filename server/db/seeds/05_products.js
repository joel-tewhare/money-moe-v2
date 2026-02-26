export async function seed(knex) {
  const t0 = '2026-02-26T08:00:00.000Z'

  await knex('products').insert([
    {
      id: 1,
      category_id: 1,
      product_name: 'Bottled Water',
      cost_cents: 50,
      retail_cents: 150,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 2,
      category_id: 1,
      product_name: 'Apple',
      cost_cents: 50,
      retail_cents: 100,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 3,
      category_id: 1,
      product_name: 'Banana',
      cost_cents: 50,
      retail_cents: 150,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 4,
      category_id: 1,
      product_name: 'Sandwich',
      cost_cents: 250,
      retail_cents: 500,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 5,
      category_id: 1,
      product_name: 'Juice Box',
      cost_cents: 100,
      retail_cents: 250,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 6,
      category_id: 1,
      product_name: 'Muffin',
      cost_cents: 150,
      retail_cents: 350,
      created_at: t0,
      updated_at: t0,
    },
  ])
}
