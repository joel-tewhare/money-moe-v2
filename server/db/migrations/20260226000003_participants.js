export function up(knex) {
  return knex.schema.createTable('participants', (table) => {
    table.increments('id').primary()
    table.integer('class_id').references('id').inTable('classes')
    table.string('display_name').notNullable()
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('participants')
}
