export function up(knex) {
  return knex.schema.createTable('store_stock', (table) => {
    table.increments('id').primary()
    table.integer('store_id').notNullable().references('id').inTable('stores')
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
    table.integer('quantity').notNullable().defaultTo(0)
    table.integer('retail_cents')
    table.timestamps(true, true)
    table.unique(['store_id', 'product_id'])
  })
}

export function down(knex) {
  return knex.schema.dropTable('store_stock')
}
