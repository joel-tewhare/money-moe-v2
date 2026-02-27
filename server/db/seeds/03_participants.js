export async function seed(knex) {
  const t0 = '2026-02-26T08:00:00.000Z'

  await knex('participants').insert([
    { id: 1, class_id: 1, display_name: 'Jamie', created_at: t0, updated_at: t0 },
    { id: 2, class_id: 1, display_name: 'Mia', created_at: t0, updated_at: t0 },
    { id: 3, class_id: null, display_name: 'Solo Sam', created_at: t0, updated_at: t0 },
  ])
}
