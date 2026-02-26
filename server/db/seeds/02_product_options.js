export async function seed(knex) {
  await knex('product_options').del()

  await knex('product_options').insert([
    {
      id: 1,
      type: 'food-drink',
      description: 'Food & Drink',
      budget: 100.0,
    },
  ])
}
