exports.up = async (sql) => {
  console.log('Creating Users table...');
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(20) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping Users table...');
  await sql`
    DROP TABLE users
  `;
};
