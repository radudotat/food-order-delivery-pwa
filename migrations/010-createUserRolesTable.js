exports.up = async (sql) => {
  await sql`
      CREATE TABLE user_roles
      (
          PRIMARY KEY (user_id, role_id),
          user_id integer REFERENCES users (id) ON DELETE CASCADE,
          role_id integer REFERENCES roles (id) ON DELETE CASCADE
      );
  `;
};

exports.down = async (sql) => {
  await sql`
      DROP TABLE user_roles
  `;
};
