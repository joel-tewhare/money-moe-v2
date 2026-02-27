export function up(knex) {
  return knex.schema.createTable('sale_items', (table) => {
    table.increments('id').primary()
    table.integer('sale_id').notNullable().references('id').inTable('sales')
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
    table.integer('quantity').notNullable()
    table.integer('retail_cents').notNullable()
    table.integer('cost_cents').notNullable()
    table.integer('line_total_cents').notNullable()
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('sale_items')
}
