exports.up = async (sql) => {
  // console.log('Creating postgis extension...');
  // await sql`CREATE EXTENSION postgis`;

  console.log('Creating Restaurants table...');
  await sql`
    CREATE TABLE restaurants (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(20) NOT NULL,
      address varchar(120) NOT NULL,
      logo varchar(120) NULL,
      cover varchar(120) NULL,
      geog geography
    );
  `;

  await sql`CREATE INDEX ON restaurants USING gist(geog);`;
};

exports.down = async (sql) => {
  console.log('Dropping Restaurants table...');
  await sql`
    DROP TABLE restaurants
  `;
};
