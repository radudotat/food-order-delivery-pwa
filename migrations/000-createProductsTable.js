exports.up = async (sql) => {
  console.log('Creating Products table...');
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			menu_id integer,
			category_id integer,
      name varchar(20) NOT NULL,
      price integer NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping Products table...');
  await sql`
    DROP TABLE products
  `;
};
