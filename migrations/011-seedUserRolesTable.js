const userRoleRelations = [
  {
    user_id: 1,
    role_id: 1,
  },
  {
    user_id: 2,
    role_id: 2,
  },
  {
    user_id: 3,
    role_id: 3,
  },
  {
    user_id: 4,
    role_id: 4,
  },
  {
    user_id: 5,
    role_id: 5,
  },
]

exports.up = async (sql) => {
  await sql`
      INSERT INTO user_roles ${sql(
      userRoleRelations,
      'user_id',
      'role_id',
  )}
  `
}

exports.down = async (sql) => {
  for (const userRole of userRoleRelations) {
    await sql`
        DELETE
        FROM user_roles
        WHERE user_id = ${userRole.user_id}
          AND role_id = ${userRole.role_id}
    `
  }
}
