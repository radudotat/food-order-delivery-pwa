exports.up = async (sql) => {
  // console.log('Creating postgis extension...');
  // await sql`CREATE EXTENSION postgis`;

  console.log('Creating Restaurants table...');
  await sql`
    CREATE TABLE restaurants (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(100) NOT NULL,
      address varchar(120) NULL,
      logo varchar(120) NULL,
      cover varchar(120) NULL,
      amenity varchar(100) NULL,
      cuisine varchar(100) NULL,
      location GEOGRAPHY(Point) NULL,
      distance float NULL 
    );
  `;

  await sql`CREATE INDEX ON restaurants USING gist(location);`;
};

exports.down = async (sql) => {
  console.log('Dropping Restaurants table...');
  await sql`
    DROP TABLE restaurants
  `;
};
