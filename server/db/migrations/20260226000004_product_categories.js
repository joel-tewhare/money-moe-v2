export function up(knex) {
  return knex.schema.createTable('product_categories', (table) => {
    table.increments('id').primary()
    table.string('slug').notNullable().unique()
    table.string('name').notNullable()
    table.integer('budget_cents')
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('product_categories')
}
