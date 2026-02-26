export async function seed(knex) {
  const t2 = '2026-02-26T08:12:00.000Z'

  await knex('sale_items').insert([
    { id: 1, sale_id: 1, product_id: 1, quantity: 2, retail_cents: 150, cost_cents: 50, line_total_cents: 300, created_at: t2, updated_at: t2 },
    { id: 2, sale_id: 1, product_id: 2, quantity: 3, retail_cents: 100, cost_cents: 50, line_total_cents: 300, created_at: t2, updated_at: t2 },
    { id: 3, sale_id: 1, product_id: 3, quantity: 2, retail_cents: 150, cost_cents: 50, line_total_cents: 300, created_at: t2, updated_at: t2 },
    { id: 4, sale_id: 1, product_id: 4, quantity: 1, retail_cents: 500, cost_cents: 250, line_total_cents: 500, created_at: t2, updated_at: t2 },
    { id: 5, sale_id: 1, product_id: 5, quantity: 2, retail_cents: 250, cost_cents: 100, line_total_cents: 500, created_at: t2, updated_at: t2 },
    { id: 6, sale_id: 1, product_id: 6, quantity: 1, retail_cents: 350, cost_cents: 150, line_total_cents: 350, created_at: t2, updated_at: t2 },
    { id: 7, sale_id: 1, product_id: 2, quantity: 1, retail_cents: 100, cost_cents: 50, line_total_cents: 100, created_at: t2, updated_at: t2 },
    { id: 8, sale_id: 1, product_id: 1, quantity: 1, retail_cents: 150, cost_cents: 50, line_total_cents: 150, created_at: t2, updated_at: t2 },
    { id: 9, sale_id: 1, product_id: 5, quantity: 1, retail_cents: 250, cost_cents: 100, line_total_cents: 250, created_at: t2, updated_at: t2 },
    { id: 10, sale_id: 1, product_id: 4, quantity: 1, retail_cents: 500, cost_cents: 250, line_total_cents: 500, created_at: t2, updated_at: t2 },
  ])
}
