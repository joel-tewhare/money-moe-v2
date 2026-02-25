export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('auth_id').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('role').notNullable().defaultTo('kid')
    table.string('username').unique()
    table.string('first_name')
    table.string('last_name')
    table.boolean('profile_complete').defaultTo(false)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}

//key points
//function up to create table, down to clean up
//primary id set that automatically increments
//not nullable used to prevent empty values, unique means no duplicates
//table types need to match data, snake case used for data table names
//some fields remain optional, details are given after user is created in table with auth0 sync
//deafult role of kid allows for teacher role to be created later
//profile complete boolean gives an easy way to check if profile is complete
