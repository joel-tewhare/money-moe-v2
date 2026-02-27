export function up(knex) {
  return knex.schema.createTable('classes', (table) => {
    table.increments('id').primary()
    table.string('code').notNullable().unique()
    table.integer('owner_user_id').unsigned().references('id').inTable('users')
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('classes')
}
