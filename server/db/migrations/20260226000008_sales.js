export function up(knex) {
  return knex.schema.createTable('sales', (table) => {
    table.increments('id').primary()
    table.integer('store_id').unsigned().notNullable().references('id').inTable('stores')
    table.datetime('sold_at').notNullable()
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('sales')
}
