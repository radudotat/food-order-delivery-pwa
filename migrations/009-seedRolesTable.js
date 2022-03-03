const roles = [
  {
    role: 'user',
  },
  {
    role: 'admin',
  },
  {
    role: 'owner',
  },
  {
    role: 'employee',
  },
  {
    role: 'delivery',
  },
];

exports.up = async (sql) => {
  await sql`
      INSERT INTO roles ${sql(roles, 'role')}
  `;
};

exports.down = async (sql) => {
  for (const role of roles) {
    await sql`
        DELETE
        FROM roles
        WHERE role = ${role.role}
    `;
  }
};
