exports.up = async (sql) => {
  console.log('Creating Roles table...');
  await sql`
    CREATE TABLE roles (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      role varchar(20) NOT NULL UNIQUE
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping Roles table...');
  await sql`
    DROP TABLE roles
  `;
};
