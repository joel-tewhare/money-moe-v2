export async function seed(knex) {
  const t0 = '2026-02-26T08:00:00.000Z'

  await knex('users').insert([
    {
      id: 1,
      auth_id: 'auth0|65f1c2a9b8d3a1f2c0a7e123',
      email: 'teacher.aroha@example.com',
      role: 'teacher',
      username: 'aroha_teacher',
      first_name: 'Aroha',
      last_name: 'Kaiako',
      profile_complete: true,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 2,
      auth_id: 'google-oauth2|112233445566778899001',
      email: 'teacher.tui@example.com',
      role: 'teacher',
      username: 'tui_teacher',
      first_name: 'Tui',
      last_name: 'Rangatahi',
      profile_complete: true,
      created_at: t0,
      updated_at: t0,
    },
    {
      id: 3,
      auth_id: 'auth0|6620aa9f0c1b2d3e4f5a6789',
      email: 'teacher.joel@example.com',
      role: 'teacher',
      username: 'joel_teacher',
      first_name: 'Joel',
      last_name: 'Te Whare',
      profile_complete: false,
      created_at: t0,
      updated_at: t0,
    },
  ])
}
