exports.up = async (sql) => {
  console.log('Creating Toppings table...');
  await sql`
    CREATE TABLE toppings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(20) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping Toppings table...');
  await sql`
    DROP TABLE toppings
  `;
};
