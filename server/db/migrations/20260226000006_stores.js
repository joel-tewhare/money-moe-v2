export function up(knex) {
  return knex.schema.createTable('stores', (table) => {
    table.increments('id').primary()
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('product_categories')
    table
      .integer('participant_id')
      .notNullable()
      .references('id')
      .inTable('participants')
    table.datetime('started_at').notNullable()
    table.datetime('ended_at')
    table.integer('total_revenue_cents').notNullable().defaultTo(0)
    table.integer('total_cost_cents').notNullable().defaultTo(0)
    table.integer('profit_cents').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('stores')
}
