export function up(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary()
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('product_categories')
    table.string('product_name').notNullable()
    table.integer('cost_cents').notNullable()
    table.integer('retail_cents').notNullable()
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('products')
}
