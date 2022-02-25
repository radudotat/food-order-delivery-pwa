const restaurants = [
  {
    name: 'tomatensauce',
    address: 'address 1',
  },
  {
    name: 'kaese',
    address: 'address 2',
  },
  {
    name: 'oregano',
    address: 'address 3',
  },
  {
    name: 'schinkken',
    address: 'address 4',
  },
  {
    name: 'salami',
    address: 'address 5',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO restaurants ${sql(restaurants, 'name', 'address')}
  `;
};

exports.down = async (sql) => {
  for (const restaurant of restaurants) {
    await sql`
      DELETE FROM
        restaurants
      WHERE
        name = ${restaurant.name}
    `;
  }
};
