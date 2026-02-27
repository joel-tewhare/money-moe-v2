export async function seed(knex) {
  const t1 = '2026-02-26T08:10:00.000Z'

  await knex('store_stock').insert([
    { id: 1, store_id: 1, product_id: 1, quantity: 20, retail_cents: null, created_at: t1, updated_at: t1 },
    { id: 2, store_id: 1, product_id: 2, quantity: 25, retail_cents: null, created_at: t1, updated_at: t1 },
    { id: 3, store_id: 1, product_id: 3, quantity: 18, retail_cents: null, created_at: t1, updated_at: t1 },
    { id: 4, store_id: 1, product_id: 4, quantity: 10, retail_cents: null, created_at: t1, updated_at: t1 },
    { id: 5, store_id: 1, product_id: 5, quantity: 15, retail_cents: null, created_at: t1, updated_at: t1 },
    { id: 6, store_id: 1, product_id: 6, quantity: 12, retail_cents: null, created_at: t1, updated_at: t1 },
  ])
}
