export async function seed(knex) {
  await knex('users').del()

  const now = knex.fn.now()

  await knex('users').insert([
    {
      auth_id: 'auth0|65f1c2a9b8d3a1f2c0a7e123',
      email: 'kiaora.kid1@example.com',
      role: 'kid',
      username: 'moe_kid_1',
      first_name: 'Kiri',
      last_name: 'Moe',
      profile_complete: true,
      created_at: now,
      updated_at: now,
    },
    {
      auth_id: 'google-oauth2|112233445566778899001',
      email: 'teacher.tui@example.com',
      role: 'teacher',
      username: 'tui_teacher',
      first_name: 'Tui',
      last_name: 'Kaiako',
      profile_complete: true,
      created_at: now,
      updated_at: now,
    },
    {
      auth_id: 'auth0|6620aa9f0c1b2d3e4f5a6789',
      email: 'new.user@example.com',
      role: 'kid',
      profile_complete: false,
      created_at: now,
      updated_at: now,
    },
  ])
}

//key points
//del is optional but common for development
//timestamps data included here but are created automatically when not provided
//one profile complete is set as false - optional fields left blank
