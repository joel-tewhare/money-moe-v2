export async function seed(knex) {
  await knex('sale_items').del()
  await knex('sales').del()
  await knex('store_stock').del()
  await knex('stores').del()
  await knex('products').del()
  await knex('product_categories').del()
  await knex('participants').del()
  await knex('classes').del()
  await knex('users').del()
}
