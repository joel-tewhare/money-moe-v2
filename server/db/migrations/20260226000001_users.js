export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth_id').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('role').notNullable().defaultTo('teacher')
    table.string('username').unique()
    table.string('first_name')
    table.string('last_name')
    table.boolean('profile_complete').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
