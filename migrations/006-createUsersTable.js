exports.up = async (sql) => {
  console.log('Creating Users table...');
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(20) NOT NULL UNIQUE,
      password_hash varchar(100) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping Users table...');
  await sql`
    DROP TABLE users
  `;
};
